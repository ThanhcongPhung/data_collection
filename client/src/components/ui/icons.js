import * as React from 'react';

const Icon = (path: string, title = '') => ({ children, ...props }: any) => (
    <img src={path} title={title} {...props} />
);


let idCounter = 0;
function uniqueIcon(component: (id: number, props: any) => React.ReactNode) {
  return class extends React.Component<any> {
    id = idCounter++;

    render() {
      return component(this.id, this.props);
    }
  };
}
export const PlayIcon = Icon(require('./play.svg'), 'play');

export const OldPlayIcon = (props: any) => (
    <svg viewBox="0 0 13 15" {...props}>
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="icon-/-play" fill="#B7D43F">
          <path
              d="M0.978009259,0 C1.03819475,0 1.09587164,0.00733847847 1.15104167,0.0220156556 C1.2062117,0.0366928327 1.2613809,0.0538159491 1.31655093,0.0733855186 C1.37172095,0.0929550881 1.42438247,0.117416683 1.47453704,0.146771037 L12.5486111,6.7074364 C12.6388893,6.75636032 12.7191355,6.82240663 12.7893519,6.9055773 C12.8595683,6.98874797 12.9122298,7.08170203 12.947338,7.18444227 C12.9824462,7.28718251 13,7.39236737 13,7.5 C13,7.85225225 12.8495385,8.11643748 12.5486111,8.2925636 L1.45949074,14.853229 C1.38927434,14.9021529 1.31153592,14.9388453 1.22627315,14.9633072 C1.14101038,14.9877692 1.05324119,15 0.962962963,15 C0.882715648,15 0.802469537,14.9902154 0.722222222,14.9706458 C0.641974907,14.9510762 0.566744178,14.9217223 0.496527778,14.8825832 C0.165507604,14.6966723 0,14.4227024 0,14.0606654 L0.0150462963,0.939334638 C0.0150462963,0.577297603 0.1805539,0.30332774 0.511574074,0.11741683 C0.652006875,0.0391385519 0.807483715,0 0.978009259,0 Z"
              id="play-button"
          />
        </g>
      </g>
    </svg>
);

export const StopIcon = uniqueIcon(id => (
    <svg width="28" height="28" viewBox="0 0 28 28">
      <defs>
        <path
            id={'stop-path' + id}
            d="M19.833 0H3.5C1.517 0 0 1.517 0 3.5v16.333c0 1.984 1.517 3.5 3.5 3.5h16.333c1.984 0 3.5-1.516 3.5-3.5V3.5c0-1.983-1.516-3.5-3.5-3.5zM21 19.833c0 .7-.467 1.167-1.167 1.167H3.5c-.7 0-1.167-.467-1.167-1.167V3.5c0-.7.467-1.167 1.167-1.167h16.333c.7 0 1.167.467 1.167 1.167v16.333z"
        />
      </defs>
      <g fill="none" fillRule="evenodd" transform="translate(2.333 2.333)">
        <mask id={'stop-mask' + id} fill="#fff">
          <use xlinkHref={'#stop-path' + id} />
        </mask>
        <g fill="#FF4F5E" mask={`url(#stop-mask${id})`}>
          <path d="M-2.333-2.333h28v28h-28z" />
        </g>
      </g>
    </svg>
));
export const MicIcon = uniqueIcon(id => (
    <svg width="29" height="28" viewBox="0 0 29 28">
      <defs>
        <path
            id={'mic-path' + id}
            d="M9.333 18.667A4.68 4.68 0 0 0 14 14V4.667A4.68 4.68 0 0 0 9.333 0a4.68 4.68 0 0 0-4.666 4.667V14a4.68 4.68 0 0 0 4.666 4.667zM7 4.667a2.34 2.34 0 0 1 2.333-2.334 2.34 2.34 0 0 1 2.334 2.334V14a2.34 2.34 0 0 1-2.334 2.333A2.34 2.34 0 0 1 7 14V4.667zm11.667 7V14c0 4.783-3.617 8.633-8.167 9.217v2.45H14c.7 0 1.167.466 1.167 1.166S14.7 28 14 28H4.667c-.7 0-1.167-.467-1.167-1.167s.467-1.166 1.167-1.166h3.5v-2.45C3.617 22.633 0 18.667 0 14v-2.333c0-.7.467-1.167 1.167-1.167s1.166.467 1.166 1.167V14c0 3.85 3.15 7 7 7s7-3.15 7-7v-2.333c0-.7.467-1.167 1.167-1.167s1.167.467 1.167 1.167z"
        />
      </defs>
      <g fill="none" fillRule="evenodd" transform="translate(5)">
        <mask id={'mic-mask' + id} fill="#fff">
          <use xlinkHref={'#mic-path' + id} />
        </mask>
        <use xlinkHref={'#mic-path' + id} />
        <g fill="#FF4F5E" mask={`url(#mic-mask${id})`}>
          <path d="M-5 0h28v28H-5z" />
        </g>
      </g>
    </svg>
));
export const PlayOutlineIcon = uniqueIcon(id => (
    <svg width="24" height="24" viewBox="0 0 24 24">
      <defs>
        <path
            id={'play-outline-path' + id}
            d="M15.5 9.173L1.5.15c-.3-.2-.7-.2-1 0-.3.1-.5.401-.5.802v18.045c0 .401.2.702.5.903.2.1.3.1.5.1s.4-.1.5-.2l14-9.023c.3-.2.5-.501.5-.802 0-.3-.2-.702-.5-.802zM2 17.193V2.757l11.2 7.218L2 17.193z"
        />
      </defs>
      <g fill="none" fillRule="evenodd" transform="translate(4 2)">
        <mask id={'play-outline-mask' + id} fill="#fff">
          <use xlinkHref={'#play-outline-path' + id} />
        </mask>
        <g fill="#4A4A4A" mask={`url(#play-outline-mask${id})`}>
          <path d="M-4-1h24v24H-4z" />
        </g>
      </g>
    </svg>
));
export const RedoIcon = uniqueIcon(id => (
    <svg width="24" height="24" viewBox="0 0 24 24">
      <defs>
        <path
            id={'redo-path' + id}
            d="M15.171 19.399c-1.105.4-2.21.601-3.315.601-4.12 0-8.038-2.604-9.445-6.711-.2-.501.1-1.102.603-1.302.502-.2 1.105.1 1.306.6 1.507 4.208 6.029 6.411 10.248 4.909 4.22-1.503 6.43-6.01 4.923-10.217-.703-2.003-2.21-3.606-4.119-4.608-1.909-.901-4.12-1.001-6.129-.3-1.105.4-2.21 1.001-3.014 1.903L3.316 6.978h3.516c.603 0 1.005.401 1.005 1.002s-.402 1.002-1.005 1.002H.603h-.1l-.101-.1c-.1 0-.1-.1-.201-.1 0 0 0-.1-.1-.1C.1 8.58 0 8.58 0 8.48v-.2-6.31C0 1.368.402.967 1.005.967c.603 0 1.004.401 1.004 1.002v3.706l3.015-2.804C6.028 1.87 7.334 1.069 8.74.568c2.512-.902 5.224-.701 7.636.4 2.411 1.202 4.22 3.206 5.124 5.71 1.708 5.209-1.105 10.918-6.33 12.721z"
        />
      </defs>
      <g fill="none" fillRule="evenodd" transform="translate(1 2)">
        <mask id={'redo-mask' + id} fill="#fff">
          <use xlinkHref={'#redo-path' + id} />
        </mask>
        <g fill="#4A4A4A" mask={`url(#redo-mask${id})`}>
          <path d="M-1-2h24v24H-1z" />
        </g>
      </g>
    </svg>
));
export const ShareIcon = uniqueIcon(id => (
    <svg width="24" height="24" viewBox="0 0 24 24">
      <defs>
        <path
            id={'share-path' + id}
            d="M18 10.987v8.01C18 20.699 16.7 22 15 22H3c-1.7 0-3-1.301-3-3.003v-8.01c0-.6.4-1 1-1s1 .4 1 1v8.01c0 .6.4 1 1 1h12c.6 0 1-.4 1-1v-8.01c0-.6.4-1 1-1s1 .4 1 1zM5.7 5.681L8 3.38V13.99c0 .6.4 1.001 1 1.001s1-.4 1-1.001V3.379l2.3 2.302c.2.2.4.3.7.3.3 0 .5-.1.7-.3.4-.4.4-1 0-1.401L9.7.275c-.1-.1-.2-.2-.3-.2-.2-.1-.5-.1-.8 0-.1.1-.2.1-.3.2l-4 4.005c-.4.4-.4 1.001 0 1.401.4.4 1 .4 1.4 0z"
        />
      </defs>
      <g fill="none" fillRule="evenodd" transform="translate(3 1)">
        <mask id={'share-mask' + id} fill="#fff">
          <use xlinkHref={'#share-path' + id} />
        </mask>
        <g fill="#4A4A4A" mask={`url(#share-mask${id})`}>
          <path d="M-3-1h24v24H-3z" />
        </g>
      </g>
    </svg>
));
