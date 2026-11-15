// The data contract between the API and everything that draws a board
// (the simulator, the website and the Pis). Times are ISO 8601 strings in UTC.

export type Direction = 'east' | 'west';

/** null means an ordinary passenger train. */
export type TrainKind = 'Freight' | 'Empty train' | 'Light engine' | 'Test / special train' | null;

export interface Train {
  id: string;
  /** 'west' = heading out towards Wales; 'east' = heading in towards Chester. */
  direction: Direction | null;
  kind: TrainKind;
  headcode: string | null;
  operator: string | null;
  origin: string;
  destination: string;
  scheduledPass: string;
  /** The actual time once Network Rail has reported it, otherwise the forecast. */
  expectedPass: string;
  delayMinutes: number;
  cancelled: boolean;
  passed: boolean;
  /** Only known when estimating from Chester station's times. */
  chesterTime: string | null;
  platform: string | null;
  vehicles: number | null;
  reason: string | null;
}

export type BoardSource = 'junction' | 'station' | 'demo';

export interface BoardData {
  title: string;
  /** Realtime Trains' API terms (5.1) require visible, linked credit wherever this is shown publicly. */
  attribution: { text: string; url: string };
  mode: 'live' | 'demo';
  source: BoardSource | null;
  updatedAt: string | null;
  stale: boolean;
  error: string | null;
  rateLimitRemaining: Partial<Record<'minute' | 'hour' | 'day', number>> | null;
  trains: Train[];
}
