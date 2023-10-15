import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { useTranslations } from "next-intl";
import React from "react";
import { FaAngleDown } from "react-icons/fa";

function FaqAccordion() {
  const t = useTranslations("Faq");
  return (
    <div>
      <Accordion>
        <AccordionSummary expandIcon={<FaAngleDown />}>
          {t("questions.q1")}
        </AccordionSummary>
        <AccordionDetails>{t("questions.a1")}</AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<FaAngleDown />}>
          {t("questions.q2")}
        </AccordionSummary>
        <AccordionDetails>{t("questions.a2")}</AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<FaAngleDown />}>
          {t("questions.q3")}
        </AccordionSummary>
        <AccordionDetails>{t("questions.a3")}</AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<FaAngleDown />}>
          {t("questions.q4")}
        </AccordionSummary>
        <AccordionDetails>{t("questions.a4")}</AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<FaAngleDown />}>
          {t("questions.q5")}
        </AccordionSummary>
        <AccordionDetails>{t("questions.a5")}</AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<FaAngleDown />}>
          {t("questions.q6")}
        </AccordionSummary>
        <AccordionDetails>{t("questions.a6")}</AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<FaAngleDown />}>
          {t("questions.q7")}
        </AccordionSummary>
        <AccordionDetails>{t("questions.a7")}</AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<FaAngleDown />}>
          {t("questions.q8")}
        </AccordionSummary>
        <AccordionDetails>{t("questions.a8")}</AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<FaAngleDown />}>
          {t("questions.q9")}
        </AccordionSummary>
        <AccordionDetails>{t("questions.a9")}</AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<FaAngleDown />}>
          {t("questions.q10")}
        </AccordionSummary>
        <AccordionDetails>{t("questions.a10")}</AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<FaAngleDown />}>
          {t("questions.q11")}
        </AccordionSummary>
        <AccordionDetails>{t("questions.a11")}</AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<FaAngleDown />}>
          {t("questions.q12")}
        </AccordionSummary>
        <AccordionDetails>{t("questions.a12")}</AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<FaAngleDown />}>
          {t("questions.q13")}
        </AccordionSummary>
        <AccordionDetails>{t("questions.a13")}</AccordionDetails>
      </Accordion>
    </div>
  );
}

export default FaqAccordion;
