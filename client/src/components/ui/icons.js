import * as React from 'react';

const Icon = (path: string, title = '') => ({children, ...props}: any) => (
    <img src={path} title={title} {...props} alt="This is"/>
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
export const ThumbsUpIcon = (props: any) => (
    <svg width="15" height="15" viewBox="0 0 24 24">
      <defs>
        <path
            id="thumbs-up-path"
            d="M21.367 8.2c-.506-.6-1.215-1.1-2.025-1.2h-5.165V4c0-2.2-1.823-4-4.05-4-.405 0-.81.2-.912.6L5.468 9h-2.43C1.316 9 0 10.3 0 12v7c0 1.7 1.316 3 3.038 3h14.481c1.519 0 2.734-1.1 3.038-2.5l1.418-9c.1-.8-.102-1.6-.608-2.3zM5.063 20H3.038c-.608 0-1.013-.4-1.013-1v-7c0-.6.405-1 1.013-1h2.025v9zm13.469-.8c-.102.5-.507.8-1.013.8H7.089v-9.8l3.645-8.1c.81.3 1.418 1 1.418 1.9v4c0 .6.405 1 1.013 1h5.974c.304 0 .507.2.71.4.202.2.202.5.202.7l-1.52 9.1z"
        />
      </defs>
      <g fill="none" fillRule="evenodd" transform="translate(1 1)">
        <mask id="thumbs-up" fill="#fff">
          <use xlinkHref="#thumbs-up-path"/>
        </mask>
        <g fill="#4A4A4A" mask="url(#thumbs-up)">
          <path d="M-1-1h24v24H-1z"/>
        </g>
      </g>
    </svg>
);
export const ThumbsDownIcon = (props: any) => (
    <svg width="15" height="15" viewBox="0 0 24 24">
      <defs>
        <path
            id="thumbs-down-path"
            d="M22 2.913C21.797 1.205 20.38 0 18.658 0H4.48C2.96 0 1.745 1.105 1.442 2.511L.024 11.553c-.203 1.607.911 3.214 2.532 3.415h5.266v3.014c0 2.21 1.823 4.018 4.05 4.018.406 0 .81-.2.912-.603l3.747-8.438h2.026c1.721 0 3.14-1.206 3.342-2.913V3.014c.101 0 .101-.1.101-.1zm-7.09 8.94l-3.645 8.138c-.81-.302-1.418-1.005-1.418-1.909v-4.018c0-.603-.405-1.005-1.012-1.005H3.062h-.203c-.506-.1-.911-.602-.81-1.105l1.418-9.04c.101-.503.506-.905 1.013-.905h10.43v9.845zm5.065-1.908c-.102.603-.71 1.105-1.317 1.105h-1.722V2.01h1.722c.608 0 1.215.501 1.317 1.104v6.831z"
        />
      </defs>
      <g fill="none" fillRule="evenodd" transform="translate(1 1)">
        <mask id="thumbs-down-mask" fill="#fff">
          <use xlinkHref="#thumbs-down-path"/>
        </mask>
        <g fill="#4A4A4A" mask="url(#thumbs-down-mask)">
          <path d="M-1-1h24v24H-1z"/>
        </g>
      </g>
    </svg>
);
export const PenIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24">
      <defs>
        <path
            id="pen-a"
            d="M19.7 5.3l-5-5c-.4-.4-1-.4-1.4 0l-13 13c-.2.2-.3.4-.3.7v5c0 .6.4 1 1 1h5c.3 0 .5-.1.7-.3l13-13c.4-.4.4-1 0-1.4zM5.6 18H2v-3.6l12-12L17.6 6l-12 12z"
        />
      </defs>
      <g fill="none" fillRule="evenodd" transform="translate(2 2)">
        <mask id="pen-b" fill="#fff">
          <use xlinkHref="#pen-a"/>
        </mask>
        <use fill="#000" fillRule="nonzero" xlinkHref="#pen-a"/>
        <g fill="#4A4A4A" mask="url(#pen-b)">
          <path d="M-2-2h24v24H-2z"/>
        </g>
      </g>
    </svg>
);
export const TrashIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24">
      <defs>
        <path
            id="trash-a"
            d="M21 5h-4V4c0-1.7-1.3-3-3-3h-4C8.3 1 7 2.3 7 4v1H3c-.6 0-1 .4-1 1s.4 1 1 1h1v13c0 1.7 1.3 3 3 3h10c1.7 0 3-1.3 3-3V7h1c.6 0 1-.4 1-1s-.4-1-1-1zM9 4c0-.6.4-1 1-1h4c.6 0 1 .4 1 1v1H9V4zm9 16c0 .6-.4 1-1 1H7c-.6 0-1-.4-1-1V7h12v13zm-7-9v6c0 .6-.4 1-1 1s-1-.4-1-1v-6c0-.6.4-1 1-1s1 .4 1 1zm4 0v6c0 .6-.4 1-1 1s-1-.4-1-1v-6c0-.6.4-1 1-1s1 .4 1 1z"
        />
      </defs>
      <g fill="none" fillRule="evenodd">
        <mask id="trash-b" fill="#fff">
          <use xlinkHref="#trash-a"/>
        </mask>
        <g fill="#4A4A4A" mask="url(#trash-b)">
          <path d="M0 0h24v24H0z"/>
        </g>
      </g>
    </svg>
);

export const SendIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <title>send</title>
      <path
          d="M6.48 6.794l.49 1.963a1 1 0 0 1-1.94.486l-1-4a1 1 0 0 1 1.393-1.15l15 7a1 1 0 0 1 0 1.813l-15 7a1 1
          0 0 1-1.385-1.18l2-7A1 1 0 0 1 7 11h4a1 1 0 0 1 0 2H7.754l-1.19 4.167L17.635 12 6.48 6.794z"
          fill="#000" fillRule="nonzero"/>
    </svg>
);
export const CancelIcon = () => (
    <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg" id="fi_1828774">
      <path d="m243.1875 182.859375 113.132812-113.132813c12.5-12.5 12.5-32.765624
      0-45.246093l-15.082031-15.082031c-12.503906-12.503907-32.769531-12.503907-45.25 0l-113.128906
      113.128906-113.132813-113.152344c-12.5-12.5-32.765624-12.5-45.246093 0l-15.105469 15.082031c-12.5
      12.503907-12.5 32.769531 0 45.25l113.152344 113.152344-113.128906 113.128906c-12.503907 12.503907-12.503907
      32.769531 0 45.25l15.082031 15.082031c12.5 12.5 32.765625 12.5 45.246093 0l113.132813-113.132812
      113.128906 113.132812c12.503907 12.5 32.769531 12.5 45.25 0l15.082031-15.082031c12.5-12.503906 12.5-32.769531 0-45.25zm0 0">
      </path>
    </svg>
);
export const SkipIcon = uniqueIcon(id => (
    <svg width="22" height="22" viewBox="0 0 22 22">
      <defs>
        <path
            id={'skip-path' + id}
            d="M12.558 6.142l-4.583 4.583a.832.832 0 0 1-.642.275.832.832 0 0 1-.641-.275.886.886 0 0 1 0-1.283L10.633 5.5 6.692 1.558a.886.886 0 0 1 0-1.283.886.886 0 0 1 1.283 0l4.583 4.583a.886.886 0 0 1 0 1.284zM6.142 4.858L1.558.275a.886.886 0 0 0-1.283 0 .886.886 0 0 0 0 1.283L4.217 5.5.275 9.442a.886.886 0 0 0 0 1.283.832.832 0 0 0 .642.275.832.832 0 0 0 .641-.275l4.584-4.583a.886.886 0 0 0 0-1.284z"
        />
      </defs>
      <g fill="none" fillRule="evenodd" transform="translate(4.583 5.5)">
        <mask id={'skip-mask' + id} fill="#fff">
          <use xlinkHref={'#skip-path' + id}/>
        </mask>
        <use fill="#000" fillRule="nonzero" xlinkHref={'#skip-path' + id}/>
        <g fill="#000" mask={`url(#skip-mask${id})`}>
          <path d="M-4.583-5.5h22v22h-22z"/>
        </g>
      </g>
    </svg>
));
export const VolumeIcon = (props: any) => (
    <svg width="15" height="15" viewBox="0 0 24 24">
      <defs>
        <path
            id="volume-path"
            d="M10.388.108c-.3-.198-.799-.099-1.099.1L4.595 3.982H.999c-.6 0-.999.397-.999.993v5.96c0 .595.4.993.999.993h3.596l4.694 3.774c.2.1.4.199.6.199.1 0 .3 0 .4-.1.299-.198.599-.496.599-.894V1.002c.1-.397-.1-.695-.5-.894zM8.99 12.822L5.594 10.14c-.2-.1-.4-.199-.6-.199H1.998V5.968h2.996c.2 0 .4-.099.6-.198L8.99 3.088v9.734zm6.193-9.039c2.297 2.285 2.297 6.059 0 8.443-.2.198-.5.298-.7.298-.2 0-.499-.1-.699-.298a.956.956 0 0 1 0-1.39c1.599-1.59 1.599-4.073 0-5.662a.956.956 0 0 1 0-1.39c.4-.398 1.1-.398 1.399 0zm3.596 11.919c-.2.199-.5.298-.7.298-.2 0-.499-.1-.699-.298a.956.956 0 0 1 0-1.39c3.496-3.477 3.496-9.138 0-12.615a.956.956 0 0 1 0-1.39.97.97 0 0 1 1.399 0c4.295 4.172 4.295 11.124 0 15.395z"
        />
      </defs>
      <g fill="none" fillRule="evenodd" transform="translate(0 4)">
        <mask id="volume-mask" fill="#fff">
          <use xlinkHref="#volume-path"/>
        </mask>
        <g fill="#4A4A4A" mask="url(#volume-mask)">
          <path d="M-1-4h24v24H-1z"/>
        </g>
      </g>
    </svg>
);
export const CheckIcon = uniqueIcon((id, props) => (
    <svg width="24" height="24" viewBox="0 0 24 24" {...props}>
      <defs>
        <path
            id={'check-path' + id}
            d="M17.7 1.7l-11 11c-.2.2-.4.3-.7.3-.3 0-.5-.1-.7-.3l-5-5c-.4-.4-.4-1 0-1.4.4-.4 1-.4 1.4 0L6 10.6 16.3.3c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4z"
        />
      </defs>
      <g fill="none" fillRule="evenodd" transform="translate(3 6)">
        <mask id={'check-mask' + id} fill="#fff">
          <use xlinkHref={'#check-path' + id}/>
        </mask>
        <g fill="#4A4A4A" mask={'url(#check-mask' + id + ')'}>
          <path d="M-3-6h24v24H-3z"/>
        </g>
      </g>
    </svg>
));
export const MenuIcon = ({className = '', ...props}: any) => (
    <svg className={'menu-icon ' + className} width="10" height="10" {...props}>
      <rect className="left" x="4" y="0" width="2" height="2"/>
      <rect className="right" x="4" y="0" width="2" height="2"/>
      <rect x="4" y="4" width="2" height="2"/>
      <rect className="left" x="4" y="8" width="2" height="2"/>
      <rect className="right" x="4" y="8" width="2" height="2"/>
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
          <use xlinkHref={'#stop-path' + id}/>
        </mask>
        <g fill="#FF4F5E" mask={`url(#stop-mask${id})`}>
          <path d="M-2.333-2.333h28v28h-28z"/>
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
          <use xlinkHref={'#mic-path' + id}/>
        </mask>
        <use xlinkHref={'#mic-path' + id}/>
        <g fill="#FF4F5E" mask={`url(#mic-mask${id})`}>
          <path d="M-5 0h28v28H-5z"/>
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
          <use xlinkHref={'#play-outline-path' + id}/>
        </mask>
        <g fill="#4A4A4A" mask={`url(#play-outline-mask${id})`}>
          <path d="M-4-1h24v24H-4z"/>
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
          <use xlinkHref={'#redo-path' + id}/>
        </mask>
        <g fill="#4A4A4A" mask={`url(#redo-mask${id})`}>
          <path d="M-1-2h24v24H-1z"/>
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
          <use xlinkHref={'#share-path' + id}/>
        </mask>
        <g fill="#4A4A4A" mask={`url(#share-mask${id})`}>
          <path d="M-3-1h24v24H-3z"/>
        </g>
      </g>
    </svg>
));
