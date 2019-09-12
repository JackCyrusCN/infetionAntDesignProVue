// eslint-disable-next-line
import { UserLayout, BasicLayout, RouteView, BlankLayout, PageView } from '@/layouts'
import { bxAnaalyse } from '@/core/icons'

export const asyncRouterMap = [

  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: '首页' },
    redirect: '/general',
    children: [
      // 全院概况
      {
        path: '/general',
        name: 'general',
        component: () => import('@/views/general/General'),
        meta: { title: '全院概况', icon: 'home', keepAlive: true }
      },

      // 预警
      {
        path: '/warning/warning-list',
        name: 'warning',
        component: () => import('@/views/warning/WarningList'),
        meta: { title: '预警', icon: 'alert' }
      },

      // 综合监测
      {
        path: '/monitor/comprehensive',
        name: 'compMonitor',
        component: () => import('@/views/monitor/Comprehensive'),
        meta: { title: '综合监测', icon: 'cluster' }
      },

      // 目标监测
      {
        path: '/monitor/target',
        name: 'targetMonitor',
        component: RouteView,
        meta: { title: '目标监测', icon: 'eye' },
        redirect: '/monitor/target/',
        children: [
          {
            path: '/monitor/target/icu',
            name: 'ICU',
            component: () => import('@/views/monitor/target/ICU/ICU'),
            meta: { title: 'ICU病人监测', keepAlive: false }
          },
          {
            path: '/monitor/target/surgery',
            name: 'Surgery',
            component: () => import('@/views/monitor/target/Surgery'),
            meta: { title: '外科手术监测', keepAlive: false }
          },
          {
            path: '/dashboard/newborn',
            name: 'Newborn',
            component: () => import('@/views/monitor/target/Newborn'),
            meta: { title: '高危新生儿监测', keepAlive: false }
          },
          {
            path: '/dashboard/antibacterial',
            name: 'Antibacterial',
            component: () => import('@/views/monitor/target/Antibacterial'),
            meta: { title: '抗菌药物监测', keepAlive: false }
          }
        ]
      },

      // 感染登记
      {
        path: '/iregister',
        name: 'iregister',
        component: RouteView,
        meta: { title: '感染登记', icon: 'highlight' },
        redirect: '',
        children: [
          {
            path: '/iregister/case',
            name: 'case',
            component: () => import('@/views/iregister/Case'),
            meta: { title: '感染病历登记', keepAlive: true }
          },
          {
            path: '/iregister/reported',
            name: 'reported',
            component: () => import('@/views/iregister/Reported'),
            meta: { title: '已上报登记管理', keepAlive: true }
          },
          {
            path: '/iregister/reported/view',
            name: 'reportedView',
            component: () => import('@/views/iregister/ReportedView'),
            meta: { title: '查看上报病历', keepAlive: true },
            hidden: true
          },
          {
            path: '/iregister/case/add',
            name: 'CaseAdd',
            component: () => import('@/views/iregister/RegisterList'),
            meta: { title: '感染病历登记新增', keepAlive: true },
            hidden: true
          },
          {
            path: '/iregister/icu/add',
            name: 'ICUAdd',
            component: () => import('@/views/iregister/form/ICUTargetAdd'),
            meta: { title: '感染病历登记新增', keepAlive: true },
            hidden: true
          },
          {
            path: '/iregister/breathma/add',
            name: 'BreathMaAdd',
            component: () => import('@/views/iregister/form/BreathMachineAdd'),
            meta: { title: '呼吸机登记新增', keepAlive: true },
            hidden: true
          },
          {
            path: '/iregister/intubation/add',
            name: 'Intubation',
            component: () => import('@/views/iregister/form/IntubationAdd'),
            meta: { title: '导尿管拔管指征评估', keepAlive: true },
            hidden: true
          },
          {
            path: '/iregister/evac-machine/add',
            name: 'EvacMachine',
            component: () => import('@/views/iregister/form/EvacMachineAdd'),
            meta: { title: '呼吸机撤机指征评估表', keepAlive: true },
            hidden: true
          },
          {
            path: '/iregister/infection-report/add',
            name: 'InfectionReport',
            component: () => import('@/views/iregister/form/InfectionReportAdd'),
            meta: { title: '感染上报表', keepAlive: true },
            hidden: true
          },
          {
            path: '/iregister/infection-report/edit',
            name: 'InfectionReport',
            component: () => import('@/views/iregister/form/InfectionReportEdit'),
            meta: { title: '感染上报表', keepAlive: true },
            hidden: true
          }
        ]
      },

      // 上报审批
      {
        path: '/examine/examine-list',
        name: 'examine',
        component: RouteView, // () => import('@/views/examine/ExamineList'),
        meta: { title: '上报审批', icon: 'issues-close' },
        redirect: '/examine/examine-list',
        children: [
          {
            path: '/examine/examine-list',
            name: 'examineList',
            component: () => import('@/views/examine/ExamineList'),
            meta: { title: '上报审批', keepAlive: true }
          },
          {
            path: '/examine/examine-form',
            name: 'examineForm',
            component: () => import('@/views/examine/ExamineForm'),
            meta: { title: '处理审批', keepAlive: true },
            hidden: true
          }
        ]
      },
      // 干预
      {
        path: '/intervene/intervene',
        name: 'intervene',
        component: () => import('@/views/intervene/Intervene'),
        meta: { title: '干预', icon: 'highlight' }
      },

      // 病例
      {
        path: '/case/case',
        name: 'caseView',
        component: () => import('@/views/case/Case'),
        meta: { title: '病例', icon: 'folder-open' }
      }
    ]
  },
  {
    path: '*', redirect: '/404', hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Register')
      },
      {
        path: 'register-result',
        name: 'registerResult',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/RegisterResult')
      }
    ]
  },
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }

]
