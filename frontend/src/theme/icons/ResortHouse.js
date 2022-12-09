import React from 'react'

export const resortHouse = (color = '#BDBDBD') => {
  return (
    <svg viewBox="0 -11 85 85" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M2.12513 71.1872C2.12513 71.1872 0.530843 71.1872 0.53125 72.7809C0.531657 74.3747 2.125 74.3747 2.125 74.3747C2.125 74.3747 11.5812 74.5807 40.1931 74.5807C71.1796 74.5807 79.6877 74.9059 79.6877 74.9059H81.8127C81.8127 74.9059 83.9377 74.9059 83.9377 73.3122C83.9377 71.7184 81.8127 71.7184 81.8127 71.7184H74.933C74.933 71.7184 74.9064 71.7184 74.933 70.2298V53.6014C74.933 53.6014 76.1889 53.6014 77.736 53.6014C79.2841 53.6014 79.5464 52.3664 78.3213 50.8422L63.6968 32.6329C62.4756 31.1087 60.5047 31.1194 59.2983 32.6571L58.6446 33.4909C59.9777 34.5572 60.5273 36.3354 60.0025 37.9703C59.4626 39.6529 57.9145 40.8039 56.1486 40.8374L55.8523 40.8439L64.7307 50.5648C65.8329 51.7743 66.1182 53.5203 65.4586 55.0169C64.7968 56.5125 63.3133 57.4801 61.68 57.4801H50.9786V68.75C50.3962 68.7134 49.8128 68.6757 49.2088 68.6451V55.7239H61.68C62.6151 55.7239 63.4608 55.1723 63.8392 54.3167C64.2166 53.4598 64.0541 52.4636 63.421 51.7731L51.9093 39.1626L56.1147 39.0844C57.124 39.0641 58.0095 38.4058 58.3163 37.4462C58.6255 36.4845 58.2896 35.4338 57.4796 34.833L52.3975 31.0515H52.9265C52.9306 31.0515 52.9355 31.0515 52.9384 31.0515C54.1962 31.0673 55.3105 29.9991 55.3105 28.6929C55.3105 28.0732 55.0727 27.5093 54.6815 27.0888L48.7598 18.788H49.3412C49.3451 18.788 49.348 18.788 49.3531 18.788C50.6486 18.7433 51.724 17.7342 51.724 16.4287C51.724 15.7865 51.4678 15.2041 51.0517 14.7773L41.8125 2.59356C41.3595 1.99438 40.6938 1.61697 39.8941 1.66008C39.1418 1.67237 38.441 2.04236 38.0063 2.65694L29.4827 14.7063C28.9727 15.4258 28.9093 16.3702 29.3128 17.1531C29.6674 17.8372 30.3286 18.2996 31.0787 18.4041L24.7613 27.1684C24.322 27.7771 24.2249 28.5446 24.4439 29.2474C25.5303 29.4569 26.5397 30.0334 27.3329 30.9084L27.9524 31.6511L34.4532 39.745L35.658 38.1396C36.1943 37.4259 36.279 36.4677 35.8799 35.6694C35.4812 34.8695 34.6642 34.3645 33.7709 34.3645H31.848L35.5538 30.0933C36.159 29.395 36.3012 28.4075 35.9174 27.5677C35.5335 26.7268 34.6956 26.1885 33.7711 26.1885H31.2857L37.585 17.4492C38.104 16.7311 38.1746 15.7824 37.771 14.995C37.4122 14.2922 36.7282 13.8224 35.9562 13.7282L39.9977 8.01498L44.5898 14.072H44.1767C43.2923 14.072 42.4831 14.5647 42.0796 15.3507C41.6744 16.1366 41.7439 17.0816 42.2568 17.8009L48.3443 26.3354H45.273C44.257 26.3354 43.3536 26.987 43.0347 27.9531C42.7142 28.9193 43.0501 29.9809 43.8658 30.5897L49.1228 34.5005L46.6063 34.5481C45.6791 34.5654 44.8482 35.1231 44.4827 35.9752C44.1183 36.827 44.2828 37.8135 44.9067 38.4989L56.329 51.0107H46.8468C45.5433 51.0107 44.4876 52.0676 44.4876 53.3699V68.4789C43.3317 68.451 42.1486 68.4343 40.9284 68.4294V55.8321C40.5664 55.9271 40.181 55.9827 39.7681 55.9827H39.3244V68.4292C38.7342 68.4312 38.1438 68.4341 37.5709 68.4401V53.6096C37.5709 53.6096 38.8253 53.6096 40.3739 53.6096C41.9204 53.6096 42.1823 52.3746 40.9592 50.8511L26.3337 32.6343C25.11 31.1085 23.1397 31.1215 21.9343 32.6591L7.68448 50.8195C6.4795 52.3567 6.75393 53.6036 8.30237 53.6036H11.104C11.104 53.6036 11.104 69.8803 11.104 70.2298C11.104 70.5794 11.2639 71.2281 11.2639 71.2281L2.12513 71.1872ZM25.4137 53.7996H29.677V60.063H25.4137V53.7996ZM25.4137 62.8502H29.677V68.6869C28.1794 68.7701 26.7636 68.8692 25.4137 68.981V62.8502ZM18.3658 53.7996H22.6297V60.063H18.3658V53.7996ZM18.3658 62.8502H22.6297V69.1136H18.3658V62.8502Z"
        fill={color}/>
    </svg>
  )
}