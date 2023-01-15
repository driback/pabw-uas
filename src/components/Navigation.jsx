"use client";

import { useRouter, useSelectedLayoutSegment } from "next/navigation";
import styles from "../style/components/Navigation.module.scss";

const Navigation = () => {
  const segment = useSelectedLayoutSegment();
  const { push } = useRouter();
  const links = [
    {
      label: "json",
      href: "/cars-json",
    },
    {
      label: "xml",
      href: "/cars-xml",
    },
    {
      label: "csv",
      href: "/cars-csv",
    },
    {
      label: "crud",
      href: "/crud",
    },
  ];

  return (
    <section className={styles.Navigation}>
      <nav className={styles.Navigation__Nav}>
        {links?.map((da, index) => (
          <span
            key={index}
            className={styles.Navigation__Item}
            onClick={() => push(da?.href)}
            style={{ fontWeight: da?.href?.includes(segment) ? 600 : 500 }}
          >
            {da?.label}
          </span>
        ))}
      </nav>
    </section>
  );
};

export default Navigation;
