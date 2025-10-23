import { App } from 'cdk8s';
import { HelloKubernetes } from './src/hello-kubernetes';
import { Nginx } from './src/nginx';

const app = new App();
new HelloKubernetes(app);
new Nginx(app);
app.synth();
