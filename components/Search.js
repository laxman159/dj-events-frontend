import styles from "@/styles/Search.module.css";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Search() {
  const [term, setterm] = useState("");

  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/events/search?term=${term}`);
    setterm("");
  };

  return (
    <div className={styles.search}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={term}
          onChange={(e) => setterm(e.target.value)}
          placeholder="Search Events"
        />
      </form>
    </div>
  );
}
