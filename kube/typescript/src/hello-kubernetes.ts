import { Construct } from 'constructs';
import { Chart } from 'cdk8s';
import { IntOrString, KubeDeployment, KubeService, Quantity } from './../imports/k8s';

export class HelloKubernetes extends Chart {
  private image = 'paulbouwer/hello-kubernetes:1.7';

  private replicas = 1;

  constructor(scope: Construct, id = 'hello-kubernetes') {
    super(scope, id);

    const label = { app: id };

    const serviceId = id + '-service';
    new KubeService(this, serviceId, {
      metadata: {
        name: serviceId,
        labels: label
      },
      spec: {
        type: 'LoadBalancer',
        ports: [{ port: 8080, targetPort: IntOrString.fromNumber(8080) }],
        selector: label
      }
    });

    const deploymentId = id + '-deployment';
    new KubeDeployment(this, deploymentId, {
      metadata: {
        name: deploymentId,
        labels: label
      },
      spec: {
        replicas: this.replicas,
        selector: {
          matchLabels: label
        },
        template: {
          metadata: { labels: label },
          spec: {
            containers: [{
              name: 'hello-kubernetes',
              image: this.image,
              resources: {
                requests: {
                  cpu: Quantity.fromString('250m'),
                  memory: Quantity.fromString('256Mi')
                },
                limits: {
                  cpu: Quantity.fromString('500m'),
                  memory: Quantity.fromString('512Mi')
                }
              }
            }]
          }
        }
      }
    });
  }
}