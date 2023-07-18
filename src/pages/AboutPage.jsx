import React from "react";
import Container from "@mui/material/Container";
import PageHeader from "../components/PageHeader";
import Grid from "@mui/material/Grid";

const AboutPage = () => {
  return (
    <Container>
      <PageHeader
        title="About Page"
        subtitle="On this page you can find explanations about using the application"
      />

      <Grid container spacing={2}>
        <Grid item xs={12} md={8} alignSelf="center">
          Revolutionary Business Cards: [Business Card Company BCard] breaks free from the ordinary, redefining business cards as a platform for personal branding and artistic expression. Our passionate team of rebel designers pushes creative boundaries, crafting cards that ignite curiosity and make a lasting impact. With cutting-edge design, innovative materials, and interactive features like NFC and augmented reality, your card becomes a work of art that speaks volumes. Collaborate with us to unleash the power of your business card and make a statement that resonates. Contact us today to embark on a design adventure that sets you apart.
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          sx={{ display: { md: "flex", xs: "none" }, justifyContent: "center" }}
        >
          <img src="/assets/images/card.jpg" alt="card" width="100%" />
        </Grid>
      </Grid>
    </Container>
  );
};

export default AboutPage;
