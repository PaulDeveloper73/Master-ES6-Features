import { useEffect, useState } from "react";

export default function InvoiceList() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadInvoices() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("/api/invoices", {
          signal: controller.signal,
          headers: {
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Could not load invoices. HTTP ${response.status}`);
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("The server returned an invalid invoice list");
        }

        setInvoices(data);
      } catch (error) {
        if (error.name === "AbortError") {
          return;
        }

        console.error("Invoice loading error:", error);
        setError(error.message || "Something went wrong");
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadInvoices();

    return () => {
      controller.abort();
    };
  }, []);

  if (loading) {
    return <p>Loading invoices...</p>;
  }

  if (error) {
    return <p role="alert">Error: {error}</p>;
  }

  if (invoices.length === 0) {
    return <p>No invoices found.</p>;
  }

  return (
    <section>
      <h2>Invoices</h2>

      <ul>
        {invoices.map((invoice) => (
          <li key={invoice.id}>
            <strong>{invoice.id}</strong>
            {" — "}
            {invoice.customer}
            {" — "}
            {invoice.amount.toLocaleString("en-UG")} UGX
            {" — "}
            {invoice.status}
          </li>
        ))}
      </ul>
    </section>
  );
}
