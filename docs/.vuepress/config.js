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
      title: 'English',
      description: 'English Documentation',
    },
    '/br/': {
      lang: 'Português',
      title: 'Português',
      description: 'Português Brasil Documentação',
    },
  },

  theme: defaultTheme({
    theme: "readthedocs",
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
        text: 'github',
        link: 'https://github.com/celsonery/devops-docs'
      },
      ],
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
      text: 'kubernetes',
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
      text: 'kubernetes-addons',
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
      text: 'kvm',
      collapsible: true,
      children: [
        '/kvm/disk-resize-kvm'
      ],
    },
    {
      text: 'gitlab',
      collapsible: true,
      children: [
        '/gitlab/gitlab'
      ],
    },
    {
      text: 'keycloak',
      collapsible: true,
      children: [
        '/keycloak/keycloak-15',
        '/keycloak/keycloak-26',
      ],
    },
    {
      text: 'postgres',
      collapsible: true,
      children: [
        '/postgres/postgres',
        '/postgres/zabbix-postgres',
      ],
    },
    {
      text: 'letsencrypt',
      collapsible: true,
      children: [
        '/letsencrypt/letsencrypt',
      ],
    },
    {
      text: 'vsftp',
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
  }),
})
