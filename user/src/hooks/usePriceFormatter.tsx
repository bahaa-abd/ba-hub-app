import { useState, useEffect } from "react";
import i18n from "lib/i18next";

const usePriceFormatter = () => {
  const [formatter, setFormatter] = useState(
    new Intl.NumberFormat(i18n.language, {
      style: "currency",
      currency: "SYP",
    })
  );

  useEffect(() => {
    const updateFormatter = () => {
      setFormatter(
        new Intl.NumberFormat(i18n.language, {
          style: "currency",
          currency: "SYP",
        })
      );
    };

    i18n.on("languageChanged", updateFormatter);
    return () => {
      i18n.off("languageChanged", updateFormatter);
    };
  }, []);

  return formatter;
};

export default usePriceFormatter;
