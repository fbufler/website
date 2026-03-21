<script setup lang="ts">
useHead({ title: 'About — fbufler' })
</script>

<template>
  <div>
    <div class="mb-8">
      <UiFilePath path="~/about.md" class="text-sm mb-2 block" />
      <h1 class="text-2xl font-bold text-tn-blue">About</h1>
    </div>

    <div class="prose max-w-none">
      <p>
        Hey, I'm <strong>Florian Bufler</strong> — a software engineer who likes building things
        and writing about them.
      </p>

      <p>
        This site is where I share <a href="/blog">ideas and writeups</a>,
        show off <a href="/projects">projects</a>,
        and keep an <a href="/cv">online CV</a>.
      </p>

      <h2>Stack & Expertise</h2>
      <p>
        As a Senior Software Engineer, my core focus lies in <strong>Go</strong> and <strong>Cloud-Native Architectures</strong>.
        I specialize in building resilient backend systems, designing scalable APIs, and orchestrating
        complex infrastructure across diverse environments—from on-premises solutions to global hyperscalers
        like <strong>GCP, AWS, Azure, and STACKIT</strong>.
      </p>

      <ul>
        <li><strong>Cloud & Orchestration:</strong> Deep expertise in <strong>Kubernetes</strong> and <strong>GitOps (ArgoCD)</strong>. I architected cloud orchestration layers from scratch, ensuring scalable, declarative deployments across multi-cloud environments.</li>
        <li><strong>API & Backend:</strong> Lead Engineer for core API services using <strong>Go</strong>; experienced with Python and TypeScript for high-performance, type-safe microservices and full-stack versatility.</li>
        <li><strong>Automotive & Embedded:</strong> Foundational background in low-level development using <strong>C and C++</strong> for microprocessors/microcontrollers, specifically for <strong>Vehicle Control Units (VCUs)</strong> and Digital Twin industries.</li>
        <li><strong>Platform Engineering & DevOps:</strong> Expert in <strong>Infrastructure as Code (IaC)</strong>, Linux environments, and developer experience platforms like <strong>Backstage</strong> to bridge the gap between code and production.</li>
        <li><strong>Data Systems:</strong> Extensive experience managing relational and NoSQL databases, including PostgreSQL, Redis, MongoDB, and InfluxDB for both real-time telemetry and persistent application state.</li>
      </ul>

      <h2>This site</h2>
      <p>
        I'm not a strong frontend engineer, nor a designer, but I try to keep things simple.
        And can at least built almost everything using the right documentation.
        That's how this site was built.
      </p>
      <p>
        Built with Nuxt + <code>@nuxt/content</code> for markdown-powered content.
        Design inspired by the Tokyo Night color scheme and Coding aesthetics, as I enjoy these things way to much.
        Source on <a href="https://github.com/fbufler" target="_blank" rel="noopener">GitHub</a>.
      </p>
    </div>
  </div>
</template>
