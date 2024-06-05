
export default interface AppDetail {
  id: string;
  name: string;
  target: {
    provider: string;
    targetId: string;
    deploymentSettings: object;
    replicas: number;
  };
  status: string;

  application: {
    status: string;
    desiredState: string;

    ref: {
      groupId: string;
      artifactId: string;
      version: string;
      packaging: string;
    };
    configuration: object;
    integrations: {
      services: {
        objectStoreV2: object;
      };
    };
  };
  desiredVersion: string;
  replicas: {
    id: string;
    state: string;
    deploymentLocation: string;
    currentDeploymentVersion: string;
  }[];
  lastSuccessfulVersion: string;
}
