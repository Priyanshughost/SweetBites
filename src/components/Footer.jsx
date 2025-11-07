import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t py-10 text-center text-stone-600 text-sm">
      © {new Date().getFullYear()} SweetBites — Crafted Fresh Daily.
    </footer>

  );
}
