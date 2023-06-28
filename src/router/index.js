import EventList from '../views/EventList.vue'
import EventLayout from '../views/EventLayout.vue'
import NonRegularEvent from '../components/NonRegularEvent.vue'
import RegularEvent from '../components/RegularEvent.vue'
import RegularEventRedeeming from '../components/RegularEventRedeeming.vue'
import PointPass from '../components/PointPass.vue'
const routes = [
  {
    name: 'home',
    path: '/',
    component: EventList,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/non-regular-events/:id',
    component: EventLayout,
    children: [
      {
        // 限時活動內容
        name: 'non-regular-event',
        path: '',
        component: NonRegularEvent,
        props: true
      }
    ]
  },
  {
    path: '/regular-events/:id',
    component: EventLayout,
    children: [
      {
        // 常態活動內容
        name: 'regular-event',
        path: '',
        component: RegularEvent,
        props: true,
      },
      {
        // 常態活動兌換
        name: 'regular-event-redeeming',
        path: 'redeeming',
        component: RegularEventRedeeming,
        props: true,
      }
    ]
  },
  {
    path: '/point-pass/:id',
    component: EventLayout,
    children: [
      {
        // 集點頁面
        name: 'point-pass',
        path: '',
        component: PointPass,
        props: true
      }
    ]
  },
  // {
  //   path: '/events/:id',
  //   component: EventLayout,
  //   children: [
  //     {
  //       // 集點QRCode
  //       name: 'event-earning',
  //       path: 'earning',
  //       component: EventEarning
  //     },
  //     {
  //       // 集點紀錄
  //       name: 'event-record',
  //       path: 'record',
  //       component: EventRecord
  //     },
  //   ]
  // },
  // {
  //   path: '/gifts',
  //   component: GiftLayout,
  //   children: [
  //     {
  //       // 禮物清單
  //       name: 'gifts',
  //       path: '',
  //       component: GiftList
  //     },
  //     {
  //       // 禮物核銷
  //       name: 'gift-reimbursing',
  //       path: ':id/reimbursing',
  //       component: GiftReimbursement
  //     }
  //   ]
  // }
]

export default routes;
// / or events

// 限時活動(內容)
// non-regular-events/:id
// 常態活動(內容)
// regular-events/:id
// regular-events/:id/redeeming (兌換)

// events/:id/earning (集點QRCode)
// events/:id/records (紀錄)

// gifts (禮物清單)
// gifts/:id/reimbursing (核銷)

