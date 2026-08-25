import { Box, Container, Grid, Typography, styled } from "@mui/material";
import { motion } from "framer-motion";

type ExperienceItem = {
  title: string;
  role: string;
  period: string;
  description: string;
  imageUrl?: string;
  videoUrl?: string; // arquivo local .mp4, .webm etc.
  embedUrl?: string; // ex.: URL de incorporação do YouTube/Vimeo
};

const experiences: ExperienceItem[] = [
  {
    title: "The Developer's Conference (TDC)",
    role: "Colaborador / Community",
    period: "2023 — 2024",
    description:
      "Participação ativa em trilhas e comunidades, networking com profissionais e exposição a tendências do mercado.",
    imageUrl: "DownloadFiles/images/experience/tdc.png",
  },
  {
    title: "Monitoria de Java",
    role: "Monitor Acadêmico",
    period: "2022 — 2023",
    description:
      "Apoio a estudantes em estruturas de dados, orientação a objetos e boas práticas com Java.",
    imageUrl: "DownloadFiles/images/experience/monitoria_java.png",
  },
  {
    title: "Voluntariado / Comunidade",
    role: "Organização de Meetups",
    period: "2022 — atual",
    description:
      "Organização de encontros, talks e suporte a eventos locais de tecnologia.",
    imageUrl: "DownloadFiles/images/experience/community.png",
  },
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
  gap: theme.spacing(2),
  padding: theme.spacing(2.5),
  borderRadius: 16,
  background: "rgba(1, 44, 50, 0.06)",
  border: "1px solid rgba(230, 126, 34, 0.3)",
}));

const ImageWrap = styled(Box)(() => ({
  width: "100%",
  borderRadius: 12,
  overflow: "hidden",
  background: "rgba(230,126,34,0.08)",
  aspectRatio: "16/9",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const Experience = () => {
  return (
    <Section id="experiences">
      <Container maxWidth="lg">
        <Box textAlign="center" mb={{ xs: 3, md: 5 }}>
          <Typography variant="h2" color="primary" sx={{ fontWeight: 700 }}>
            Experiências
          </Typography>
          <Typography variant="body2" color="primary" sx={{ opacity: 0.85 }}>
            Alguns trabalhos, eventos e participações marcantes
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {experiences.map((exp, idx) => (
            <Grid key={idx} item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                viewport={{ once: true }}
              >
                <Card>
                  <ImageWrap>
                    {exp.videoUrl ? (
                      <motion.video
                        src={exp.videoUrl}
                        controls
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        whileHover={{ scale: 1.01 }}
                        transition={{ duration: 0.25 }}
                      />
                    ) : exp.embedUrl ? (
                      <motion.iframe
                        src={exp.embedUrl}
                        title={exp.title}
                        style={{ width: "100%", height: "100%", border: 0 }}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        whileHover={{ scale: 1.01 }}
                        transition={{ duration: 0.25 }}
                      />
                    ) : exp.imageUrl ? (
                      <motion.img
                        src={exp.imageUrl}
                        alt={exp.title}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        whileHover={{ scale: 1.03 }}
                        transition={{ duration: 0.25 }}
                      />
                    ) : (
                      <Typography variant="body2" color="primary">
                        Mídia em breve
                      </Typography>
                    )}
                  </ImageWrap>

                  <Box display="flex" alignItems="center" justifyContent="space-between" flexWrap="wrap" gap={1}>
                    <Typography variant="h5" color="primary" sx={{ fontWeight: 700 }}>
                      {exp.title}
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
                      {exp.period}
                    </Box>
                  </Box>

                  <Typography variant="body2" color="primary" sx={{ fontWeight: 600 }}>
                    {exp.role}
                  </Typography>
                  <Typography variant="body2" color="primary">
                    {exp.description}
                  </Typography>
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
