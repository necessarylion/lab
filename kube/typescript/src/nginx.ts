import { Construct } from 'constructs';
import { Chart } from 'cdk8s';
import { IntOrString, KubeDeployment, KubeService } from '../imports/k8s';

export class Nginx extends Chart {
  private image = 'nginx';

  private replicas = 1;

  constructor(scope: Construct, id = 'ts-nginx') {
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
        ports: [{
          // port exposed outside the cluster (to access from browser)
          port: 8081,
          // port the app is running on inside the container
          targetPort: IntOrString.fromNumber(80)
        }],
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
            }]
          }
        }
      }
    });
  }
}