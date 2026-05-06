import { useState } from "react";
import isEmail from "validator/lib/isEmail";

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [sending, setSending] = useState(false);

  function handleInputChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const newErrors: FormErrors = {};

    if (!isEmail(formData.email)) {
      newErrors.email = "The email must be a valid email address.";
    }

    if (formData.message.length < 10) {
      newErrors.message = "The message must be at least 10 characters.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setSending(true);

    try {
      const response = await fetch(
        "https://aw8qcbgsbl.execute-api.eu-west-2.amazonaws.com/api/contact",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        },
      );

      if (response.ok) {
        window.location.href = "/contact/sent/";
      } else {
        const params = await response.json();
        if (params.errors) {
          const serverErrors: FormErrors = {};
          for (const key in params.errors) {
            serverErrors[key] = params.errors[key][0];
          }
          setErrors(serverErrors);
        }
      }
    } catch {
      setErrors({ message: "Something went wrong. Please try again." });
    } finally {
      setSending(false);
    }
  }

  return (
    <form
      className="bg-stone-100 rounded-xl mt-10 mb-10 p-6"
      method="post"
      onSubmit={handleSubmit}
    >
      <div className="flex gap-x-5 align-bottom">
        <div className="flex-1 flex flex-col">
          <div className="mb-3 flex-grow">
            <label className="text-xl text-emerald-900" htmlFor="name">
              Name
            </label>
          </div>
          <input
            className="w-full h-10 text-xl box-border border border-stone-200 p-2 outline-emerald-500 mb-5"
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            disabled={sending}
          />
        </div>
        <div className="flex-1 flex flex-col">
          <div className="mb-3 flex-grow">
            <label htmlFor="email" className="text-xl text-emerald-900">
              Email*
            </label>
            {errors.email && (
              <span className="float-end text-xs leading-5 text-red-600 transition-all duration-200 ease-in-out">
                {errors.email}
              </span>
            )}
          </div>
          <input
            className="w-full h-10 text-xl box-border border border-stone-200 p-2 outline-emerald-500 mb-5"
            id="email"
            type="email"
            name="email"
            inputMode="email"
            value={formData.email}
            onChange={handleInputChange}
            disabled={sending}
          />
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="message" className="text-xl text-emerald-900">
          Message*
        </label>
        {errors.message && (
          <span className="float-end text-xs leading-5 text-red-600 transition-all duration-200 ease-in-out">
            {errors.message}
          </span>
        )}
      </div>
      <textarea
        className="w-full text-xl box-border border border-stone-200 p-2 outline-emerald-500 mb-5"
        id="message"
        name="message"
        rows={5}
        value={formData.message}
        onChange={handleInputChange}
        disabled={sending}
      />
      <input
        className="w-[30%] min-w-20 border-2 border-emerald-900 rounded-xl text-xl block mx-auto mb-2 h-12 hover:text-stone-100 hover:bg-emerald-500 hover:border-emerald-500 disabled:text-stone-100 disabled:bg-emerald-500 disabled:border-emerald-500 transition-all duration-200 ease-in-out cursor-pointer disabled:cursor-wait"
        type="submit"
        value="Send"
        disabled={sending}
      />
    </form>
  );
}
