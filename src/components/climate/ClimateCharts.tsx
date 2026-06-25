import { useState, useEffect, useMemo } from "react";
import { Icon } from "@iconify/react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const RANGES = ["1h", "24h", "7d", "30d"] as const;
type Range = (typeof RANGES)[number];

const RANGE_LABELS: Record<Range, string> = {
  "1h": "1 Hour",
  "24h": "24 Hours",
  "7d": "7 Days",
  "30d": "30 Days",
};

interface ClimateDataPoint {
  time: string;
  entityId: string;
  deviceClass: string;
  value: number;
}

interface RoomConfig {
  id: string;
  label: string;
  tempEntityId: string;
  humidityEntityId: string;
  color: string;
}

interface FloorConfig {
  label: string;
  rooms: RoomConfig[];
}

const FLOORS: FloorConfig[] = [
  {
    label: "Upstairs",
    rooms: [
      {
        id: "study",
        label: "Study",
        tempEntityId: "study_temperature",
        humidityEntityId: "study_humidity",
        color: "#059669",
      },
      {
        id: "bedroom",
        label: "Bedroom",
        tempEntityId: "bedroom_temperature",
        humidityEntityId: "bedroom_humidity",
        color: "#0891b2",
      },
    ],
  },
  {
    label: "Downstairs",
    rooms: [
      {
        id: "lounge",
        label: "Living Room",
        tempEntityId: "lounge_temperature",
        humidityEntityId: "lounge_humidity",
        color: "#7c3aed",
      },
    ],
  },
];

interface ForecastData {
  temperature: number | null;
  humidity: number | null;
  windSpeed: number | null;
  uvIndex: number | null;
  condition: string | null;
  time: string | null;
}

const CONDITION_CONFIG: Record<string, { label: string; icon: string }> = {
  sunny: { label: "Sunny", icon: "meteocons:clear-day-fill" },
  "clear-night": { label: "Clear", icon: "meteocons:clear-night-fill" },
  partlycloudy: { label: "Partly Cloudy", icon: "meteocons:partly-cloudy-day-fill" },
  cloudy: { label: "Cloudy", icon: "meteocons:overcast-fill" },
  fog: { label: "Fog", icon: "meteocons:fog-fill" },
  rainy: { label: "Rainy", icon: "meteocons:rain-fill" },
  pouring: { label: "Heavy Rain", icon: "meteocons:overcast-rain-fill" },
  snowy: { label: "Snowy", icon: "meteocons:snow-fill" },
  "snowy-rainy": { label: "Sleet", icon: "meteocons:sleet-fill" },
  lightning: { label: "Thunderstorm", icon: "meteocons:thunderstorms-fill" },
  "lightning-rainy": { label: "Thunderstorm", icon: "meteocons:thunderstorms-fill" },
  hail: { label: "Hail", icon: "meteocons:hail-fill" },
  windy: { label: "Windy", icon: "meteocons:wind-fill" },
  "windy-variant": { label: "Windy", icon: "meteocons:wind-fill" },
  exceptional: { label: "Exceptional", icon: "meteocons:extreme-fill" },
};

interface ChartDataPoint {
  time: number;
  value: number | null;
  prevValue: number | null;
}

function buildChartData(
  current: ClimateDataPoint[],
  previous: ClimateDataPoint[] | null,
  entityId: string,
  range: Range,
): ChartDataPoint[] {
  const currentFiltered = current.filter((p) => p.entityId === entityId);

  const timeMap = new Map<number, ChartDataPoint>();

  for (const point of currentFiltered) {
    const t = new Date(point.time).getTime();
    timeMap.set(t, { time: t, value: point.value, prevValue: null });
  }

  if (previous) {
    const prevFiltered = previous.filter((p) => p.entityId === entityId);
    const rangeMs = {
      "1h": 3600_000,
      "24h": 86400_000,
      "7d": 604800_000,
      "30d": 2592000_000,
    }[range];

    for (const point of prevFiltered) {
      const originalTime = new Date(point.time).getTime();
      const shiftedTime = originalTime + rangeMs;
      const closest = findClosestTime(timeMap, shiftedTime);
      if (closest !== null) {
        const entry = timeMap.get(closest)!;
        entry.prevValue = point.value;
      }
    }
  }

  return Array.from(timeMap.values()).sort((a, b) => a.time - b.time);
}

function findClosestTime(
  timeMap: Map<number, ChartDataPoint>,
  target: number,
): number | null {
  let closest: number | null = null;
  let minDiff = Infinity;
  for (const t of timeMap.keys()) {
    const diff = Math.abs(t - target);
    if (diff < minDiff) {
      minDiff = diff;
      closest = t;
    }
  }
  if (closest !== null && minDiff < 600_000) return closest;
  return null;
}

function formatTime(timestamp: number, range: Range): string {
  const date = new Date(timestamp);
  if (range === "1h" || range === "24h") {
    return date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatTooltipTime(timestamp: number): string {
  return new Date(timestamp).toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getLatestReading(
  data: ClimateDataPoint[],
  entityId: string,
): number | null {
  const filtered = data.filter((p) => p.entityId === entityId);
  if (filtered.length === 0) return null;
  const latest = filtered.reduce((a, b) =>
    new Date(a.time) > new Date(b.time) ? a : b,
  );
  return Math.round(latest.value * 10) / 10;
}

interface RoomChartProps {
  data: ChartDataPoint[];
  label: string;
  unit: string;
  color: string;
  range: Range;
  compare: boolean;
}

function RoomChart({ data, label, unit, color, range, compare }: RoomChartProps) {
  if (data.length === 0) {
    return (
      <div className="h-48 flex items-center justify-center text-gray-400 text-sm">
        No data available
      </div>
    );
  }

  return (
    <div>
      <p className="text-sm text-gray-500 mb-2">{label}</p>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="time"
            tickFormatter={(t) => formatTime(t, range)}
            stroke="#9ca3af"
            fontSize={11}
            minTickGap={40}
          />
          <YAxis
            stroke="#9ca3af"
            fontSize={11}
            tickFormatter={(v) => `${v}${unit}`}
            width={50}
          />
          <Tooltip
            labelFormatter={formatTooltipTime}
            formatter={(value: number) => [
              `${Math.round(value * 10) / 10}${unit}`,
            ]}
            contentStyle={{
              backgroundColor: "#fafaf9",
              border: "1px solid #e7e5e4",
              borderRadius: "8px",
              fontSize: "13px",
            }}
          />
          <Line
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            dot={{ r: 2, fill: color, strokeWidth: 0 }}
            activeDot={{ r: 4, strokeWidth: 0 }}
            name="Current"
            connectNulls
            isAnimationActive={false}
          />
          {compare && (
            <Line
              dataKey="prevValue"
              stroke={color}
              strokeWidth={1.5}
              strokeDasharray="5 5"
              strokeOpacity={0.4}
              dot={false}
              name="Previous"
              connectNulls
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

interface StatCardProps {
  label: string;
  temperature: number | null;
  humidity: number | null;
  color: string;
}

function StatCard({ label, temperature, humidity, color }: StatCardProps) {
  return (
    <div className="bg-stone-100 border border-stone-200 rounded-xl p-4">
      <div className="flex items-center gap-2 mb-2">
        <div
          className="w-2.5 h-2.5 rounded-full"
          style={{ backgroundColor: color }}
        />
        <span className="text-sm font-medium text-gray-700">{label}</span>
      </div>
      <div className="flex gap-4">
        <div>
          <span className="text-2xl font-bold text-gray-900">
            {temperature !== null ? `${temperature}°` : "—"}
          </span>
          <span className="text-xs text-gray-400 ml-1">C</span>
        </div>
        <div>
          <span className="text-2xl font-bold text-gray-900">
            {humidity !== null ? `${humidity}%` : "—"}
          </span>
          <span className="text-xs text-gray-400 ml-1">RH</span>
        </div>
      </div>
    </div>
  );
}

function uvColor(index: number): string {
  if (index < 3) return "#22c55e";
  if (index < 5) return "#eab308";
  if (index < 7) return "#f97316";
  return "#ef4444";
}

function ForecastCard({ forecast }: { forecast: ForecastData | null }) {
  const condition = forecast?.condition ?? null;
  const config = condition ? CONDITION_CONFIG[condition] : null;
  const conditionLabel = config?.label ?? condition;

  const temp =
    forecast?.temperature !== null && forecast?.temperature !== undefined
      ? Math.round(forecast.temperature * 10) / 10
      : null;
  const humidity =
    forecast?.humidity !== null && forecast?.humidity !== undefined
      ? Math.round(forecast.humidity)
      : null;
  const wind =
    forecast?.windSpeed !== null && forecast?.windSpeed !== undefined
      ? Math.round(forecast.windSpeed * 10) / 10
      : null;
  const uv =
    forecast?.uvIndex !== null && forecast?.uvIndex !== undefined
      ? Math.round(forecast.uvIndex * 10) / 10
      : null;

  return (
    <div className="bg-stone-100 border border-stone-200 rounded-xl p-4 flex items-center gap-4">
      <div className="w-14 h-14 shrink-0 rounded-full bg-white flex items-center justify-center shadow-sm">
        <Icon
          icon={config?.icon ?? "meteocons:cloudy-fill"}
          className="w-10 h-10"
          style={{ filter: "saturate(1.6)" }}
        />
      </div>
      <div className="min-w-0">
        <div>
          <span className="text-xs text-gray-400">Outside</span>
          <p className="text-lg font-bold text-gray-900">
            {conditionLabel ?? "—"}
          </p>
        </div>
        <div className="flex items-baseline gap-4 sm:gap-6 mt-1">
          <div>
            <span className="text-xs text-gray-400">Temp</span>
            <p className="text-lg font-bold text-gray-900">
              {temp !== null ? `${temp}°C` : "—"}
            </p>
          </div>
          <div>
            <span className="text-xs text-gray-400">Humidity</span>
            <p className="text-lg font-bold text-gray-900">
              {humidity !== null ? `${humidity}%` : "—"}
            </p>
          </div>
          <div>
            <span className="text-xs text-gray-400">Wind</span>
            <p className="text-lg font-bold text-gray-900">
              {wind !== null ? `${wind} km/h` : "—"}
            </p>
          </div>
          <div>
            <span className="text-xs text-gray-400">UV</span>
            <p className="text-lg font-bold text-gray-900 flex items-center gap-1.5">
              {uv !== null ? (
                <>
                  <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: uvColor(uv) }} />
                  {uv}
                </>
              ) : "—"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const ALL_ROOMS = FLOORS.flatMap((f) => f.rooms);

export default function ClimateCharts() {
  const [range, setRange] = useState<Range>("24h");
  const [compare, setCompare] = useState(false);
  const [data, setData] = useState<{
    current: ClimateDataPoint[];
    previous: ClimateDataPoint[] | null;
  }>({ current: [], previous: null });
  const [latestData, setLatestData] = useState<ClimateDataPoint[]>([]);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [initialLoad, setInitialLoad] = useState(true);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setFetching(true);
    setError(false);

    const params = new URLSearchParams({ range });
    if (compare && range !== "30d") {
      params.set("compare", "true");
    }

    fetch(`/api/climate?${params}`)
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((json) => {
        setData(json);
        setLatestData(json.current);
        setForecast(json.forecast ?? null);
        setInitialLoad(false);
        setFetching(false);
      })
      .catch(() => {
        setError(true);
        setInitialLoad(false);
        setFetching(false);
      });
  }, [range, compare]);

  const showCompare = compare && range !== "30d";

  const statCards = useMemo(
    () =>
      ALL_ROOMS.map((room) => ({
        room,
        temperature: getLatestReading(latestData, room.tempEntityId),
        humidity: getLatestReading(latestData, room.humidityEntityId),
      })),
    [latestData],
  );

  return (
    <div>
      <div className="mb-4">
        <ForecastCard forecast={forecast} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {statCards.map(({ room, temperature, humidity }) => (
          <StatCard
            key={room.id}
            label={room.label}
            temperature={temperature}
            humidity={humidity}
            color={room.color}
          />
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-8">
        <div className="flex bg-stone-100 border border-stone-200 rounded-lg p-1">
          {RANGES.map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                range === r
                  ? "bg-emerald-600 text-white"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {RANGE_LABELS[r]}
            </button>
          ))}
        </div>

        {range !== "30d" && (
          <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={compare}
              onChange={(e) => setCompare(e.target.checked)}
              className="accent-emerald-600"
            />
            Compare to previous period
          </label>
        )}
      </div>

      {initialLoad ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : error ? (
        <div className="text-center py-20 text-gray-500">
          Failed to load climate data. Please try again later.
        </div>
      ) : (
        <div className="relative">
          {fetching && (
            <div className="absolute top-0 right-0 z-10">
              <div className="w-4 h-4 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
            </div>
          )}
          <div className={fetching ? "opacity-60 transition-opacity" : "transition-opacity"}>
            <ChartContent
              data={data}
              range={range}
              compare={showCompare}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function ChartContent({
  data,
  range,
  compare,
}: {
  data: { current: ClimateDataPoint[]; previous: ClimateDataPoint[] | null };
  range: Range;
  compare: boolean;
}) {
  return (
    <>
      {FLOORS.map((floor) => (
        <div key={floor.label} className="mb-10">
          <h3 className="font-display text-lg font-bold text-gray-700 mb-4">
            {floor.label}
          </h3>
          <div className="space-y-8">
            {floor.rooms.map((room) => (
              <RoomCharts
                key={room.id}
                room={room}
                data={data}
                range={range}
                compare={compare}
              />
            ))}
          </div>
        </div>
      ))}
    </>
  );
}

function RoomCharts({
  room,
  data,
  range,
  compare,
}: {
  room: RoomConfig;
  data: { current: ClimateDataPoint[]; previous: ClimateDataPoint[] | null };
  range: Range;
  compare: boolean;
}) {
  const tempData = useMemo(
    () =>
      buildChartData(
        data.current,
        compare ? data.previous : null,
        room.tempEntityId,
        range,
      ),
    [data, room.tempEntityId, range, compare],
  );

  const humidityData = useMemo(
    () =>
      buildChartData(
        data.current,
        compare ? data.previous : null,
        room.humidityEntityId,
        range,
      ),
    [data, room.humidityEntityId, range, compare],
  );

  return (
    <div className="bg-white border border-stone-200 rounded-xl p-5">
      <h4 className="font-display font-bold text-gray-800 mb-4 flex items-center gap-2">
        <span
          className="w-2.5 h-2.5 rounded-full inline-block"
          style={{ backgroundColor: room.color }}
        />
        {room.label}
      </h4>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RoomChart
          data={tempData}
          label="Temperature"
          unit="°C"
          color={room.color}
          range={range}
          compare={compare}
        />
        <RoomChart
          data={humidityData}
          label="Relative Humidity"
          unit="%"
          color={room.color}
          range={range}
          compare={compare}
        />
      </div>
    </div>
  );
}
