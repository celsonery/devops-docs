import {defaultTheme} from '@vuepress/theme-default'
import {defineUserConfig} from 'vuepress/cli'
import {viteBundler} from '@vuepress/bundler-vite'

export default defineUserConfig({
  head: [['link', {rel: 'icon', href: '/images/hero.png'}]],
  bundler: viteBundler(),
  lang: 'en-US',

  title: 'DevOps',
  description: 'DevOps Documentation',
  base: "/devops-docs/",

  locales: {
    '/': {
      lang: 'en-US',
      title: 'DevOps',
      description: 'English Documentation',
    },
    '/br/': {
      lang: 'Português',
      title: 'DevOps',
      description: 'Português Brasil Documentação',
    },
  },

  theme: defaultTheme({
    //theme: "readthedocs",
    docsRepo: 'https://github.com/celsonery/devops-docs',
    docsBranch: 'main',
    docsDir: 'docs',
    editLinkPattern: ':repo/-/edit/:branch/:path',
    sidebarDepth: 0,
    logo: '/images/hero.png',
    navbar: [
      {
        text: 'Home',
        link: '/'
      },
      {
        text: 'Github',
        link: 'https://github.com/celsonery/devops-docs'
      },
      ],
      locales: {
        '/': {
        sidebar: [
          {
            text: 'Docker',
            collapsible: true,
            children: [
                '/docker/docker',
                '/docker/install-docker',
                '/docker/volumes-docker'
              ],
          },
          {
            text: 'Kubernetes',
            collapsible: true,
            children: [
              '/kubernetes/prepare',
              '/kubernetes/install-kubernetes',
              '/kubernetes/initialize-master',
              '/kubernetes/initialize-slave',
              '/kubernetes/running-yamls',
              '/kubernetes/running',
              '/kubernetes/server-registry-local',
              '/kubernetes/helm',
              '/kubernetes/metric-server',
              '/kubernetes/volumes-k8s',
              '/kubernetes/renovar-certs',
              '/kubernetes/add-new-node-at-kubernetes',
              '/kubernetes/regcred',
              '/kubernetes/commands',
              '/kubernetes/service-yaml',
              '/kubernetes/using',
              ],
          },
          {
            text: 'Kubernetes-addons',
            collapsible: true,
            children: [
              '/kubernetes-addons/cert-manager',
              '/kubernetes-addons/ingress-controller',
              '/kubernetes-addons/prometheus',
              '/kubernetes-addons/grafana',
              '/kubernetes-addons/portainer',
              '/kubernetes-addons/redis-cluster',
            ],
          },
          {
            text: 'Kvm',
            collapsible: true,
            children: [
              '/kvm/disk-resize-kvm'
            ],
          },
          {
            text: 'Gitlab',
            collapsible: true,
            children: [
              '/gitlab/gitlab'
            ],
          },
          {
            text: 'Keycloak',
            collapsible: true,
            children: [
              '/keycloak/keycloak-15',
              '/keycloak/keycloak-26',
            ],
          },
          {
            text: 'Postgres',
            collapsible: true,
            children: [
              '/postgres/postgres',
              '/postgres/zabbix-postgres',
            ],
          },
          {
            text: 'Letsencrypt',
            collapsible: true,
            children: [
              '/letsencrypt/letsencrypt',
            ],
          },
          {
            text: 'Vsftp',
            collapsible: true,
            children: [
              '/vsftp/vsftp',
            ],
          },
          {
            text: 'Others',
            collapsible: true,
            children: [
              '/others/k3s',
              '/others/install-minikube',
              '/others/install-openshift'
            ],
          }
          ],
        },
        '/br/': {
        sidebar: [
          {
            text: 'Docker',
            collapsible: true,
            children: [
                '/br/docker/docker',
                '/br/docker/install-docker',
                '/br/docker/volumes-docker'
              ],
          },
          {
            text: 'Kubernetes',
            collapsible: true,
            children: [
              '/br/kubernetes/prepare',
              '/br/kubernetes/install-kubernetes',
              '/br/kubernetes/initialize-master',
              '/br/kubernetes/initialize-slave',
              '/br/kubernetes/running-yamls',
              '/br/kubernetes/running',
              '/br/kubernetes/server-registry-local',
              '/br/kubernetes/helm',
              '/br/kubernetes/metric-server',
              '/br/kubernetes/volumes-k8s',
              '/br/kubernetes/renovar-certs',
              '/br/kubernetes/add-new-node-at-kubernetes',
              '/br/kubernetes/regcred',
              '/br/kubernetes/commands',
              '/br/kubernetes/service-yaml',
              '/br/kubernetes/using',
              ],
          },
          {
            text: 'Kubernetes-addons',
            collapsible: true,
            children: [
              '/br/kubernetes-addons/cert-manager',
              '/br/kubernetes-addons/ingress-controller',
              '/br/kubernetes-addons/prometheus',
              '/br/kubernetes-addons/grafana',
              '/br/kubernetes-addons/portainer',
              '/br/kubernetes-addons/redis-cluster',
            ],
          },
          {
            text: 'Kvm',
            collapsible: true,
            children: [
              '/br/kvm/disk-resize-kvm'
            ],
          },
          {
            text: 'Gitlab',
            collapsible: true,
            children: [
              '/br/gitlab/gitlab'
            ],
          },
          {
            text: 'Keycloak',
            collapsible: true,
            children: [
              '/br/keycloak/keycloak-15',
              '/br/keycloak/keycloak-26',
            ],
          },
          {
            text: 'Postgres',
            collapsible: true,
            children: [
              '/br/postgres/postgres',
              '/br/postgres/zabbix-postgres',
            ],
          },
          {
            text: 'Letsencrypt',
            collapsible: true,
            children: [
              '/br/letsencrypt/letsencrypt',
            ],
          },
          {
            text: 'Vsftp',
            collapsible: true,
            children: [
              '/br/vsftp/vsftp',
            ],
          },
          {
            text: 'Others',
            collapsible: true,
            children: [
              '/br/others/k3s',
              '/br/others/install-minikube',
              '/br/others/install-openshift'
            ],
          }
          ],
        }
      }
  }),
})
