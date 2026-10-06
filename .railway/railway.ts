import { defineRailway, image, preserve, project, service, volume } from "railway/iac";

export default defineRailway(() => {
  const chromaVolume = volume("chroma-volume", {
    region: "us-west2",
    sizeMB: 5000,
  });

  const chroma = service("chroma", {
    source: image("ghcr.io/chroma-core/chroma:1.5.9"),
    replicas: { "us-west2": 1 },
    volumeMounts: { "/data": chromaVolume },
    env: {
      ANONYMIZED_TELEMETRY: preserve(),
      IS_PERSISTENT: preserve(),
      PORT: preserve(),
    },
    healthcheckPath: "/api/v2/heartbeat",
    healthcheckTimeout: 120,
    restartPolicyType: "ON_FAILURE",
    restartPolicyMaxRetries: 10,
  });

  return project("chroma", {
    resources: [chroma, chromaVolume],
  });
});
