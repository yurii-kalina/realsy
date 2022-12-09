import React from 'react'

export const bird = (color = '#CDCDCD') => (
  <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M19.4874 10.4999C19.3521 10.4541 18.9884 10.3073 18.8885 10.1643C18.8726 10.1416 18.8479 10.0927 18.8166 10.0308C18.6327 9.6669 18.2021 8.81475 17.3326 8.81475C17.1959 8.81475 17.0526 8.83634 16.9065 8.87895C16.0891 9.11745 15.6968 9.65971 15.4105 10.0556C15.2455 10.2836 15.1153 10.4637 14.9685 10.4919C14.9223 10.5008 14.879 10.5052 14.8398 10.5052C14.6998 10.5052 14.6214 10.452 14.6067 10.347C14.5516 9.95276 14.5642 9.46109 14.5775 8.94053C14.5995 8.07939 14.6245 7.10336 14.3382 6.3376C13.8714 5.0891 12.8294 4.08329 11.9921 3.27514C11.7829 3.07317 11.5853 2.88242 11.4158 2.70706C11.3507 2.62668 11.2831 2.55356 11.2176 2.48278C11.1227 2.38009 11.0329 2.2831 10.9674 2.18097C10.6864 1.7429 10.4896 1.24594 10.3195 0.77652C10.3034 0.72515 10.2874 0.673334 10.2715 0.621015C10.2461 0.537183 10.2181 0.473264 10.186 0.425854C10.0934 0.203975 9.98421 0 9.81576 0C9.78949 0 9.7625 0.00513144 9.73567 0.0152828C9.44602 0.124828 9.38243 0.725485 9.32627 1.25547C9.29743 1.52766 9.27021 1.78479 9.21717 1.91113C9.14867 2.07427 9.04248 2.17077 8.93003 2.27284C8.79706 2.39359 8.65957 2.51842 8.5952 2.75391C8.53084 2.98917 8.59532 3.1246 8.65773 3.25551C8.71022 3.36578 8.75986 3.46986 8.73286 3.64343C8.70458 3.8256 8.61673 3.92399 8.52376 4.02823C8.42464 4.13934 8.32207 4.25424 8.30461 4.46446C8.28654 4.68154 8.40071 4.82249 8.51115 4.95886C8.6077 5.07806 8.69889 5.19067 8.69666 5.35086C8.69477 5.48679 8.61422 5.55445 8.51232 5.64012C8.37879 5.75229 8.21263 5.89189 8.26713 6.22789C8.30316 6.44988 8.44974 6.56579 8.57909 6.66802C8.70347 6.76636 8.77949 6.83234 8.77397 6.94451C8.76978 7.02979 8.74352 7.12093 8.71574 7.21737C8.64936 7.44761 8.57412 7.70859 8.76884 7.99461C8.839 8.09769 9.0726 8.30434 9.33207 8.5159C8.61969 8.18961 7.56167 7.77775 6.45528 7.60412C4.64048 7.31938 2.88046 6.61543 1.93488 6.23721C1.48978 6.05917 1.2896 5.98041 1.21068 5.98041C1.15953 5.98041 1.14268 6.01181 1.13778 6.02537C1.11898 6.07741 1.1641 6.12638 1.27242 6.21635L1.5638 6.45814C1.95462 6.7822 2.26134 7.03648 2.39169 7.16443C2.32799 7.14179 2.2368 7.10464 2.11861 7.05333C2.05619 7.02622 2.00605 7.03693 1.97833 7.07737C1.965 7.09683 1.95853 7.12143 1.95853 7.1525C1.95853 7.49742 2.95185 9.19364 4.32406 10.8303C5.31443 12.0114 7.21713 13.9929 8.83309 13.9929C8.92953 13.9929 9.02441 13.9858 9.11672 13.9718C8.47411 14.6366 6.13825 16.3885 4.06721 17.2482C1.56463 18.2869 0.434881 18.8207 0.355845 19.2377C0.337885 19.3325 0.370682 19.421 0.453343 19.5009C0.56339 19.6072 0.666074 19.6567 0.776568 19.6567C0.854543 19.6567 0.926104 19.6318 0.995267 19.6077C1.0661 19.583 1.13934 19.5575 1.22222 19.5575C1.31481 19.5575 1.41097 19.5899 1.51611 19.6565C1.77854 19.8226 2.09367 20 2.51428 20C2.95246 20 3.43594 19.8083 3.99236 19.414C4.09661 19.3401 4.19115 19.3071 4.29908 19.3071C4.35998 19.3071 4.41972 19.3173 4.48286 19.328C4.55169 19.3397 4.62291 19.3518 4.70167 19.3518C4.88077 19.3518 5.05122 19.2851 5.23791 19.142C6.61542 18.0861 8.11759 17.8885 9.70806 17.6791C11.5842 17.4322 13.5241 17.1769 15.6104 15.5724C17.3859 14.2069 17.7363 13.0344 17.9682 12.2584C17.9927 12.1767 18.0156 12.0997 18.0388 12.0278C18.2711 11.3077 18.4074 11.1395 18.5775 11.081C18.6903 11.0422 18.9696 10.9293 19.2161 10.8298C19.3895 10.7598 19.5393 10.6993 19.5808 10.685C19.642 10.664 19.6493 10.6265 19.6482 10.606C19.6469 10.585 19.6442 10.536 19.4874 10.4999Z"
      fill={color}/>
  </svg>
)