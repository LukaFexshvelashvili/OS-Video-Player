export const PlayIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 16 16" {...props}>
    <path fill="white" opacity="1" d="M2 1v14l12-7z"></path>
  </svg>
);
export const PauseIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 256 384 " {...props}>
    <path
      fill="white"
      opacity="0.9"
      d="M0 341V43h85v298H0zM171 43h85v298h-85V43z"
    ></path>
  </svg>
);
export const SoundIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
    <path
      fill="white"
      opacity="0.9"
      fill-rule="evenodd"
      d="m403.966 426.944l-33.285-26.63c74.193-81.075 74.193-205.015-.001-286.09l33.285-26.628c86.612 96.712 86.61 242.635.001 339.348M319.58 155.105l-33.324 26.659c39.795 42.568 39.794 108.444.001 151.012l33.324 26.658c52.205-58.22 52.205-146.109-.001-204.329m-85.163-69.772l-110.854 87.23H42.667v170.666h81.02l110.73 85.458z"
    ></path>
  </svg>
);
export const SoundOffIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 512 512" {...props}>
    <path
      fill="white"
      opacity="0.9"
      fill-rule="evenodd"
      d="m403.375 257.27l59.584 59.584l-30.167 30.166l-59.583-59.583l-59.584 59.583l-30.166-30.166l59.583-59.584l-59.583-59.583l30.166-30.166l59.584 59.583l59.583-59.583l30.167 30.166zM234.417 85.333l-110.854 87.23H42.667v170.666h81.02l110.73 85.458z"
    ></path>
  </svg>
);
export const SecondsLeftSkipIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" {...props}>
    <path
      fill="white"
      opacity="0.9"
      d="M4.5 4.252v3.422c2.95-3.16 7.172-4.737 11.518-4.672c5.942.088 10.698 3.268 13.784 8.074a1.25 1.25 0 1 1-2.104 1.35c-2.713-4.225-6.751-6.85-11.717-6.925c-4.013-.06-7.768 1.503-10.192 4.5H9.75a1.25 1.25 0 1 1 0 2.5h-6.5c-.69 0-1.25-.56-1.25-1.25v-7a1.25 1.25 0 0 1 2.5 0Zm7.986 10.847c.463.196.764.65.764 1.152V27.5a1.25 1.25 0 0 1-2.5 0v-8.47a23.25 23.25 0 0 1-1.607 1.043a1.25 1.25 0 0 1-1.286-2.144c1.046-.628 1.633-1.054 2.056-1.411c.31-.262.531-.483.81-.761c.12-.12.251-.252.405-.401a1.25 1.25 0 0 1 1.358-.257Zm4.463 2.2C17.787 15.882 19.18 15 21.1 15c1.923 0 3.314.88 4.152 2.298c.781 1.322 1.035 3.023 1.035 4.701c0 1.68-.254 3.38-1.035 4.702C24.414 28.12 23.022 29 21.1 29c-1.922 0-3.313-.88-4.15-2.298c-.782-1.322-1.036-3.023-1.036-4.702c0-1.678.254-3.38 1.035-4.701Zm2.152 1.272c-.448.759-.687 1.933-.687 3.43c0 1.496.239 2.67.687 3.43c.393.663.97 1.07 2 1.07s1.606-.407 1.999-1.07c.448-.76.687-1.934.687-3.43c0-1.497-.239-2.671-.687-3.43c-.393-.664-.97-1.07-2-1.07s-1.607.406-1.999 1.07Z"
    ></path>
  </svg>
);

export const SecondsRightSkipIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" {...props}>
    <path
      fill="white"
      opacity="0.9"
      d="M16.019 5.501c4.013-.06 7.768 1.503 10.192 4.5H22.25a1.25 1.25 0 0 0 0 2.5h6.5c.69 0 1.25-.56 1.25-1.25v-7a1.25 1.25 0 0 0-2.5 0v3.423c-2.95-3.16-7.172-4.737-11.518-4.672C10.04 3.09 5.284 6.27 2.197 11.076a1.25 1.25 0 1 0 2.104 1.35c2.713-4.225 6.751-6.85 11.717-6.925Zm5.081 9.5c-1.922 0-3.313.88-4.15 2.298c-.782 1.322-1.036 3.023-1.036 4.701c0 1.68.254 3.38 1.035 4.702C17.787 28.12 19.18 29 21.1 29c1.923 0 3.314-.88 4.152-2.298c.781-1.322 1.035-3.023 1.035-4.702c0-1.678-.254-3.379-1.035-4.701c-.838-1.417-2.23-2.298-4.152-2.298Zm-2.686 7c0-1.497.239-2.671.687-3.43c.393-.664.97-1.07 2-1.07s1.606.406 1.999 1.07c.448.759.687 1.933.687 3.43c0 1.496-.239 2.67-.687 3.43c-.393.663-.97 1.07-2 1.07s-1.607-.407-1.999-1.07c-.448-.76-.687-1.934-.687-3.43Zm-5.164-5.75a1.25 1.25 0 0 0-2.122-.895c-.154.15-.285.28-.405.4c-.279.279-.5.5-.81.762c-.423.357-1.01.783-2.056 1.411a1.25 1.25 0 1 0 1.286 2.144a23.25 23.25 0 0 0 1.607-1.043v8.47a1.25 1.25 0 0 0 2.5 0V16.25Z"
    ></path>
  </svg>
);

export const DownloadIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="16"
    height="14"
    viewBox="0 0 16 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M4.5 5.66667L8 9M8 9L11.5 5.66667M8 9V1M15 9V11.6667C15 12.0203 14.8525 12.3594 14.5899 12.6095C14.3274 12.8595 13.9713 13 13.6 13H2.4C2.0287 13 1.6726 12.8595 1.41005 12.6095C1.1475 12.3594 1 12.0203 1 11.6667V9"
      stroke="white"
      stroke-opacity="0.9"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    ></path>
  </svg>
);
export const PIPIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    id="mg_frame_icon"
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 472 384"
    {...props}
  >
    <path
      fill="white"
      opacity="0.9"
      d="M384 85v128H213V85h171zm43-85q17 0 29.5 12.5T469 43v298q0 18-12.5 30.5T427 384H43q-18 0-30.5-12.5T0 341V43q0-18 12.5-30.5T43 0h384zm0 342V42H43v300h384z"
    ></path>
  </svg>
);
export const SettingsIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    id="mg_settings_toggler"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M14.0975 8.78873L15.8286 10.1033C16.0082 10.2535 16.0466 10.4288 15.944 10.6291L14.2898 13.4085C14.1872 13.6088 14.0205 13.6588 13.7897 13.5587L11.7508 12.77C11.2892 13.0955 10.8275 13.3584 10.3659 13.5587L10.0581 15.662C10.0325 15.8873 9.89144 16 9.63497 16H6.36503C6.13421 16 5.99315 15.8873 5.94186 15.662L5.6341 13.5587C5.14681 13.3584 4.68517 13.0955 4.24918 12.77L2.21027 13.5587C1.97945 13.6338 1.81275 13.5837 1.71016 13.4085L0.0559563 10.6291C-0.0466302 10.4288 -0.00816028 10.2535 0.171366 10.1033L1.90251 8.78873C1.87687 8.48826 1.86404 8.22535 1.86404 8C1.86404 7.77465 1.87687 7.51174 1.90251 7.21127L0.171366 5.89671C-0.00816028 5.74648 -0.0466302 5.57121 0.0559563 5.37089L1.71016 2.59155C1.8384 2.39124 2.0051 2.34116 2.21027 2.44131L4.24918 3.23005C4.71082 2.90454 5.17246 2.64163 5.6341 2.44131L5.94186 0.338028C5.99315 0.112676 6.13421 0 6.36503 0H9.63497C9.89144 0 10.0325 0.112676 10.0581 0.338028L10.3659 2.44131C10.8532 2.64163 11.3148 2.90454 11.7508 3.23005L13.7897 2.44131C14.0205 2.3662 14.1872 2.41628 14.2898 2.59155L15.944 5.37089C16.0466 5.57121 16.0082 5.74648 15.8286 5.89671L14.0975 7.21127C14.1488 7.51174 14.1744 7.77465 14.1744 8C14.1744 8.22535 14.1488 8.48826 14.0975 8.78873ZM8 10.8169C8.78222 10.8169 9.45545 10.5415 10.0197 9.99061C10.5839 9.43975 10.866 8.77621 10.866 8C10.866 7.22379 10.5839 6.56025 10.0197 6.00939C9.45545 5.45853 8.78222 5.1831 8 5.1831C7.21778 5.1831 6.54455 5.45853 5.98033 6.00939C5.4161 6.56025 5.13399 7.22379 5.13399 8C5.13399 8.77621 5.4161 9.43975 5.98033 9.99061C6.54455 10.5415 7.21778 10.8169 8 10.8169Z"
      fill="white"
      fill-opacity="0.9"
    ></path>
  </svg>
);

export const FullscreenOnIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    id="mg_fullscreen_on_"
    viewBox="0 0 17 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12.25 1H16V4.75"
      stroke="white"
      stroke-opacity="0.9"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    ></path>
    <path
      d="M16 12.25V16H12.25"
      stroke="white"
      stroke-opacity="0.9"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    ></path>
    <path
      d="M4.75 16H1V12.25"
      stroke="white"
      stroke-opacity="0.9"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    ></path>
    <path
      d="M1 4.75V1H4.75"
      stroke="white"
      stroke-opacity="0.9"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    ></path>
  </svg>
);

export const FullscreenOffIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    id="mg_fullscreen_off_"
    viewBox="0 0 17 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M5.66667 0.944444C5.66667 0.693962 5.56716 0.453739 5.39004 0.276621C5.21293 0.0995036 4.9727 0 4.72222 0C4.47174 0 4.23152 0.0995036 4.0544 0.276621C3.87728 0.453739 3.77778 0.693962 3.77778 0.944444V3.30556C3.77778 3.4308 3.72803 3.55091 3.63947 3.63947C3.55091 3.72803 3.4308 3.77778 3.30556 3.77778H0.944444C0.693962 3.77778 0.453739 3.87728 0.276621 4.0544C0.0995036 4.23152 0 4.47174 0 4.72222C0 4.9727 0.0995036 5.21293 0.276621 5.39004C0.453739 5.56716 0.693962 5.66667 0.944444 5.66667H3.30556C3.93176 5.66667 4.53232 5.41791 4.97511 4.97511C5.41791 4.53232 5.66667 3.93176 5.66667 3.30556V0.944444ZM5.66667 16.0556C5.66667 16.306 5.56716 16.5463 5.39004 16.7234C5.21293 16.9005 4.9727 17 4.72222 17C4.47174 17 4.23152 16.9005 4.0544 16.7234C3.87728 16.5463 3.77778 16.306 3.77778 16.0556V13.6944C3.77778 13.5692 3.72803 13.4491 3.63947 13.3605C3.55091 13.272 3.4308 13.2222 3.30556 13.2222H0.944444C0.693962 13.2222 0.453739 13.1227 0.276621 12.9456C0.0995036 12.7685 0 12.5283 0 12.2778C0 12.0273 0.0995036 11.7871 0.276621 11.61C0.453739 11.4328 0.693962 11.3333 0.944444 11.3333H3.30556C3.93176 11.3333 4.53232 11.5821 4.97511 12.0249C5.41791 12.4677 5.66667 13.0682 5.66667 13.6944V16.0556ZM12.2778 0C12.0273 0 11.7871 0.0995036 11.61 0.276621C11.4328 0.453739 11.3333 0.693962 11.3333 0.944444V3.30556C11.3333 3.93176 11.5821 4.53232 12.0249 4.97511C12.4677 5.41791 13.0682 5.66667 13.6944 5.66667H16.0556C16.306 5.66667 16.5463 5.56716 16.7234 5.39004C16.9005 5.21293 17 4.9727 17 4.72222C17 4.47174 16.9005 4.23152 16.7234 4.0544C16.5463 3.87728 16.306 3.77778 16.0556 3.77778H13.6944C13.5692 3.77778 13.4491 3.72803 13.3605 3.63947C13.272 3.55091 13.2222 3.4308 13.2222 3.30556V0.944444C13.2222 0.693962 13.1227 0.453739 12.9456 0.276621C12.7685 0.0995036 12.5283 0 12.2778 0ZM11.3333 16.0556C11.3333 16.306 11.4328 16.5463 11.61 16.7234C11.7871 16.9005 12.0273 17 12.2778 17C12.5283 17 12.7685 16.9005 12.9456 16.7234C13.1227 16.5463 13.2222 16.306 13.2222 16.0556V13.6944C13.2222 13.5692 13.272 13.4491 13.3605 13.3605C13.4491 13.272 13.5692 13.2222 13.6944 13.2222H16.0556C16.306 13.2222 16.5463 13.1227 16.7234 12.9456C16.9005 12.7685 17 12.5283 17 12.2778C17 12.0273 16.9005 11.7871 16.7234 11.61C16.5463 11.4328 16.306 11.3333 16.0556 11.3333H13.6944C13.0682 11.3333 12.4677 11.5821 12.0249 12.0249C11.5821 12.4677 11.3333 13.0682 11.3333 13.6944V16.0556Z"
      fill="white"
    ></path>
  </svg>
);
