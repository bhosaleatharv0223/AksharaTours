"use strict";

const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".primary-navigation");
const accordionTriggers = document.querySelectorAll(".accordion-trigger");

function setMenuOpen(isOpen) {
  if (!menuToggle || !navigation) return;

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
  navigation.classList.toggle("is-open", isOpen);
  document.body.classList.toggle("menu-open", isOpen);
}

if (menuToggle && navigation) {
  menuToggle.addEventListener("click", () => {
    setMenuOpen(menuToggle.getAttribute("aria-expanded") !== "true");
  });

  navigation.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) setMenuOpen(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setMenuOpen(false);
      menuToggle.focus();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 680) setMenuOpen(false);
  });
}

function setAccordionState(trigger, isExpanded) {
  const panelId = trigger.getAttribute("aria-controls");
  const panel = panelId ? document.getElementById(panelId) : null;
  if (!panel) return;

  trigger.setAttribute("aria-expanded", String(isExpanded));
  panel.hidden = !isExpanded;
}

accordionTriggers.forEach((trigger) => {
  trigger.addEventListener("click", () => {
    const shouldExpand = trigger.getAttribute("aria-expanded") !== "true";
    accordionTriggers.forEach((otherTrigger) => setAccordionState(otherTrigger, false));
    setAccordionState(trigger, shouldExpand);
  });
});

function openPolicyFromHash() {
  const policyItem = document.getElementById(decodeURIComponent(window.location.hash.slice(1)));
  if (!policyItem || !policyItem.classList.contains("policy-item")) return;

  const trigger = policyItem.querySelector(".accordion-trigger");
  if (trigger) setAccordionState(trigger, true);
}

window.addEventListener("hashchange", openPolicyFromHash);
document.querySelectorAll(".footer-navigation a").forEach((link) => {
  link.addEventListener("click", () => {
    const policyId = decodeURIComponent(link.hash.slice(1));
    const policyItem = document.getElementById(policyId);
    const trigger = policyItem?.querySelector(".accordion-trigger");
    if (trigger) setAccordionState(trigger, true);
  });
});
openPolicyFromHash();
