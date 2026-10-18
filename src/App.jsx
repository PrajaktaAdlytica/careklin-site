import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import {
  FlowBackdrop,
  Footer,
  MotionProvider,
  Nav,
  RouteEffects,
} from "./components";
import Home from "./Home";
import IntroExperience from "./intro/IntroExperience";
import Preview from "./Preview";
import {
  Products,
  Product,
  Workflow,
  UseCases,
  Ecosystem,
  Evaluation,
  Pilot,
  Governance,
  Company,
  Inquiry,
  SignIn,
  Legal,
  NotFound,
} from "./Pages";
export default function App() {
  const { pathname } = useLocation();
  return (
    <MotionProvider>
      <IntroExperience>
      <FlowBackdrop />
      <Nav />
      <main id="main" tabIndex={-1} key={pathname}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:slug" element={<Product />} />
          <Route path="/how-it-works" element={<Workflow />} />
          <Route path="/preview" element={<Preview />} />
          <Route path="/use-cases" element={<UseCases />} />
          <Route path="/ecosystem" element={<Ecosystem />} />
          <Route path="/evaluation" element={<Evaluation />} />
          <Route path="/pilot" element={<Pilot />} />
          <Route path="/pricing" element={<Navigate to="/pilot" replace />} />
          <Route path="/governance" element={<Governance />} />
          <Route path="/company" element={<Company />} />
          <Route path="/request-pilot" element={<Inquiry />} />
          <Route path="/contact" element={<Inquiry contact />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/legal/privacy" element={<Legal type="privacy" />} />
          <Route path="/legal/terms" element={<Legal type="terms" />} />
          <Route
            path="/accessibility"
            element={<Legal type="accessibility" />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <RouteEffects />
    </IntroExperience>
    </MotionProvider>
  );
}
