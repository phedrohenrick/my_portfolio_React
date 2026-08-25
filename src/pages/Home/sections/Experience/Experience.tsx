import { Box, Container, Grid, Typography, styled } from "@mui/material";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

type ExperienceItem = {
  key: string;
  link?: string;
};

const experiences: ExperienceItem[] = [
  { key: "exp1" },
  { key: "exp2", link: "https://priatoo.com.br" },
  { key: "exp3" },
  { key: "exp4" },
];

const Section = styled("section")(() => ({
  width: "100%",
  paddingTop: "48px",
  paddingBottom: "48px",
  background: "linear-gradient(180deg, rgba(230,126,34,0.08) 0%, rgba(230,126,34,0.04) 100%)",
}));

const Card = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1.5),
  padding: theme.spacing(2.5),
  borderRadius: 16,
  height: "100%",
  background: "rgba(1, 44, 50, 0.06)",
  border: "1px solid rgba(230, 126, 34, 0.3)",
}));

const Experience = () => {
  const { t } = useTranslation();

  return (
    <Section id="experiences">
      <Container maxWidth="lg">
        <Box textAlign="center" mb={{ xs: 3, md: 5 }}>
          <Typography variant="h2" color="primary" sx={{ fontWeight: 700 }}>
            {t("title_exp")}
          </Typography>
          <Typography variant="body2" color="primary" sx={{ opacity: 0.85 }}>
            {t("subtitle_exp")}
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {experiences.map((exp, idx) => (
            <Grid key={exp.key} item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                viewport={{ once: true }}
                style={{ height: "100%" }}
              >
                <Card>
                  <Box display="flex" alignItems="center" justifyContent="space-between" flexWrap="wrap" gap={1}>
                    <Typography variant="h5" color="primary" sx={{ fontWeight: 700 }}>
                      {t(`${exp.key}_company`)}
                    </Typography>
                    <Box
                      component="span"
                      sx={{
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 999,
                        background: "rgba(230,126,34,0.18)",
                        border: "1px solid rgba(230,126,34,0.35)",
                        color: "#fbf5df",
                        fontSize: 12,
                        fontWeight: 700,
                        letterSpacing: 0.2,
                      }}
                    >
                      {t(`${exp.key}_period`)}
                    </Box>
                  </Box>

                  <Typography variant="body2" color="primary" sx={{ fontWeight: 600 }}>
                    {t(`${exp.key}_role`)}
                  </Typography>
                  <Typography variant="body2" color="primary">
                    {t(`${exp.key}_desc`)}
                  </Typography>

                  {exp.link && (
                    <Typography variant="body2">
                      <a
                        href={exp.link}
                        target="_blank"
                        rel="noreferrer"
                        style={{ color: "#E67E22", fontWeight: 700, textDecoration: "underline" }}
                      >
                        {t("btnVisitSite")}
                      </a>
                    </Typography>
                  )}
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Section>
  );
};

export default Experience;
