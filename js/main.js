(() => { // 즉시 실행 함수

  let yScroll = 0; // window.scrollY 대신 쓸 변수
  let prevScrollHeight = 0; // 현재 스크롤 위치(yScroll) 이전에 위치한 (.section-scroll) 들의 높이 값의 합
  let currentScene = 0; // 현재 활성화된(눈 앞에 보고 있는) 씬 (.section-scroll)
  let enterNewScene; // 새로운 씬이 시작되는 순간 true

  const sceneInfo = [
    {
      type: 'sticky',
      heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#section-scroll-1'),
        text1: document.querySelector('#section-scroll-1 .box-text-1'),
        text2: document.querySelector('#section-scroll-1 .box-text-2'),
        text3: document.querySelector('#section-scroll-1 .box-text-3'),
        text4: document.querySelector('#section-scroll-1 .box-text-4'),
        canvas: document.querySelector('#video-canvas-1'),
        context: document.querySelector('#video-canvas-1').getContext('2d'),
        videoImages: []
      },
      values: { 
        videoImageCount: 300, // 이미지 갯수
        imageSquence: [0, 299], // 이미지 순서 값의 변화
        canvas_opacity: [1, 0, { start: 0.9, end: 1 }],
        text1_opacity_fadeIn: [0, 1, { start: 0.1, end: 0.2 }], // 10% ~ 20% 구간
        text1_opacity_fadeOut: [1, 0, { start: 0.25, end: 0.3 }],
        text1_translateY_slideIn: [20, 0, { start: 0.1, end: 0.2 }],
        text1_translateY_slideOut: [0, -20, { start: 0.25, end: 0.3 }],
        text2_opacity_fadeIn: [0, 1, { start: 0.3, end: 0.4 }], // 30% ~ 40% 구간
        text2_opacity_fadeOut: [1, 0, { start: 0.45, end: 0.5 }],
        text2_translateY_slideIn: [20, 0, { start: 0.3, end: 0.4 }],
        text2_translateY_slideOut: [0, -20, { start: 0.45, end: 0.5 }],
        text3_opacity_fadeIn: [0, 1, { start: 0.5, end: 0.6 }], // 50% ~ 60% 구간
        text3_opacity_fadeOut: [1, 0, { start: 0.65, end: 0.7 }],
        text3_translateY_slideIn: [20, 0, { start: 0.5, end: 0.6 }],
        text3_translateY_slideOut: [0, -20, { start: 0.65, end: 0.7 }],
        text4_opacity_fadeIn: [0, 1, { start: 0.7, end: 0.8 }], // 70% ~ 80% 구간
        text4_opacity_fadeOut: [1, 0, { start: 0.85, end: 0.9 }],
        text4_translateY_slideIn: [20, 0, { start: 0.7, end: 0.8 }],
        text4_translateY_slideOut: [0, -20, { start: 0.85, end: 0.9 }]  
      }
    },
    {
      type: 'normal',
      heightNum: 5, // type normal에서는 필요 없음
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#section-scroll-2'),
        content: document.querySelector('#scroll-section-2 .text-desc')
      }
    },
    {
      type: 'sticky',
      heightNum: 5, 
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#section-scroll-3'),
        text1: document.querySelector('#section-scroll-3 .box-text-1'),
        text2: document.querySelector('#section-scroll-3 .box-text-2'),
        text3: document.querySelector('#section-scroll-3 .box-text-3'),
        pin1: document.querySelector('#section-scroll-3 .box-text-2 .pin'),
        pin2: document.querySelector('#section-scroll-3 .box-text-3 .pin'),
        canvas: document.querySelector('#video-canvas-3'),
        context: document.querySelector('#video-canvas-3').getContext('2d'),
        videoImages: []
      },
      values: {
        videoImageCount: 960, // 이미지 갯수
        imageSquence: [0, 959], // 이미지 순서 값의 변화
        canvas_opacity_fadeIn: [0, 1, { start: 0, end: 0.05 }],
        canvas_opacity_fadeOut: [1, 0, { start: 0.95, end: 1 }],
        text1_opacity_fadeIn: [0, 1, { start: 0.15, end: 0.2 }], // 15% ~ 20% 구간
        text1_opacity_fadeOut: [1, 0, { start: 0.3, end: 0.35 }],
        text1_translateY_slideIn: [20, 0, { start: 0.15, end: 0.2 }],
        text1_translateY_slideOut: [0, -20, { start: 0.3, end: 0.35 }],
        text2_opacity_fadeIn: [0, 1, { start: 0.5, end: 0.55 }], // 50% ~ 55% 구간
        text2_opacity_fadeOut: [1, 0, { start: 0.58, end: 0.63 }],
        text2_translateY_slideIn: [30, 0, { start: 0.5, end: 0.55 }],
        text2_translateY_slideOut: [0, -20, { start: 0.58, end: 0.63 }],
        pin1_scaleY: [0.5, 1, { start: 0.5, end: 0.55 }],
        pin1_opacity_fadeIn: [0, 1, { start: 0.5, end: 0.55 }],
        pin1_opacity_fadeOut: [1, 0, { start: 0.58, end: 0.63 }],
        text3_opacity_fadeIn: [0, 1, { start: 0.72, end: 0.77 }], // 72% ~ 77% 구간
        text3_opacity_fadeOut: [1, 0, { start: 0.85, end: 0.9 }],
        text3_translateY_slideIn: [30, 0, { start: 0.72, end: 0.77 }],
        text3_translateY_slideOut: [0, -20, { start: 0.85, end: 0.9 }],
        pin2_opacity_fadeIn: [0, 1, { start: 0.72, end: 0.77 }],
        pin2_opacity_fadeOut: [1, 0, { start: 0.85, end: 0.9 }],
        pin2_scaleY: [0.5, 1, { start: 0.72, end: 0.77 }]
      }
    },
    {
      type: 'sticky',
      heightNum: 5, 
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#section-scroll-4'),
        canvasCaption: document.querySelector('#section-scroll-4 .text-desc')
      }
    }
  ]

  function setCanvasImages() {
    let imgElemt;
    for (let i = 0; i < sceneInfo[0].values.videoImageCount; i++) {
      imgElemt = new Image();
      imgElemt.src = `./video/001/IMG_${6726 + i}.JPG`;
      sceneInfo[0].objs.videoImages.push(imgElemt);
    }

    let imgElemt2;
    for (let i = 0; i < sceneInfo[2].values.videoImageCount; i++) {
      imgElemt2 = new Image();
      imgElemt2.src = `./video/002/IMG_${7027 + i}.JPG`;
      sceneInfo[2].objs.videoImages.push(imgElemt2);
    }
  }

  setCanvasImages();

  function setLayout() {
    // 각 스크롤 섹션의 높이 세팅
    for (let i = 0; i < sceneInfo.length; i++){
      if (sceneInfo[i].type === 'sticky') {
        sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
      } else if (sceneInfo[i].type === 'normal') {
        sceneInfo[i].scrollHeight = sceneInfo[i].objs.container.offsetHeight;
      }

      sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
    }

    let totalScrollHeight = 0;
    let yScroll = window.scrollY;
    for (let i = 0; i < sceneInfo.length; i++) {
      totalScrollHeight += sceneInfo[i].scrollHeight;
      if (totalScrollHeight >= yScroll) {
        currentScene = i;
        break;
      }
    }

    document.body.setAttribute('id', `show-scene-${currentScene + 1}`)
    const heightRatio = window.innerHeight / 1080;
    sceneInfo[0].objs.canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio})`
    sceneInfo[2].objs.canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio})`
  }

  function calcValues(values, currentScrollY) { 
    let rv;
    const scrollHeight = sceneInfo[currentScene].scrollHeight;
    const scrollRatio = currentScrollY / sceneInfo[currentScene].scrollHeight; // 현재 씬에서 얼마나 스크롤 됐는지 범위를 비율로 구하기 0 ~ 1

    if (values.length === 3) {
       // start ~ end 사이에 애니매이션 실행
      const partScrollStart = values[2].start * scrollHeight;
      const partScrollEnd = values[2].end * scrollHeight;
      const partScrollHeight = partScrollEnd - partScrollStart;

      if (currentScrollY >= partScrollStart && currentScrollY <= partScrollEnd) {
          rv = (currentScrollY - partScrollStart) / partScrollHeight * (values[1] - values[0]) + values[0];
      } else if (currentScrollY < partScrollStart) {
        rv = values[0];
      } else if (currentScrollY > partScrollEnd) {
        rv = values[1];
      }
    } else {
      rv = scrollRatio * (values[1] - values[0]) + values[0]; // parseInt 정수 처리
    }

    return rv;
  }


  function playAnimation() {
    const objs = sceneInfo[currentScene].objs;
    const values = sceneInfo[currentScene].values;
    const currentScrollY = yScroll - prevScrollHeight; // 현재 씬에서 얼마나 스크롤 됐는지의 정보
    const scrollHeight = sceneInfo[currentScene].scrollHeight;
    const scrollRatio = currentScrollY / scrollHeight //현재 씬의 scrollHeihgt;

    // console.log(currentScene);
    // console.log(currentScene, currentScrollY);

    switch (currentScene) {
      case 0:
        // let text1_opacity_0 = values.text1_opacity[0];
        // let text1_opacity_1 = values.text1_opacity[1];
        // console.log(text1_opacity_0, text1_opacity_1)
        // console.log(text1_opacity_fadeIn)

        let sequence = Math.round(calcValues(values.imageSquence, currentScrollY));
        objs.context.drawImage(objs.videoImages[sequence], 0, 0);
        objs.canvas.style.opacity = calcValues(values.canvas_opacity, currentScrollY);

        if (scrollRatio <= 0.22) {
          objs.text1.style.opacity = calcValues(values.text1_opacity_fadeIn, currentScrollY);
          objs.text1.style.transform = `translateY(${calcValues(values.text1_translateY_slideIn, currentScrollY)}%)`;
        } else {
          objs.text1.style.opacity = calcValues(values.text1_opacity_fadeOut, currentScrollY);
          objs.text1.style.transform = `translateY(${calcValues(values.text1_translateY_slideOut, currentScrollY)}%)`;
        }
        if (scrollRatio <= 0.42) {
          objs.text2.style.opacity = calcValues(values.text2_opacity_fadeIn, currentScrollY);
          objs.text2.style.transform = `translate3d(0, ${calcValues(values.text2_translateY_slideIn, currentScrollY)}%, 0)`;
        } else {
          objs.text2.style.opacity = calcValues(values.text2_opacity_fadeOut, currentScrollY);
          objs.text2.style.transform = `translate3d(0, ${calcValues(values.text2_translateY_slideOut, currentScrollY)}%, 0)`;
        }
        if (scrollRatio <= 0.62) {
          objs.text3.style.opacity = calcValues(values.text3_opacity_fadeIn, currentScrollY);
          objs.text3.style.transform = `translate3d(0, ${calcValues(values.text3_translateY_slideIn, currentScrollY)}%, 0)`;
        } else {
          objs.text3.style.opacity = calcValues(values.text3_opacity_fadeOut, currentScrollY);
          objs.text3.style.transform = `translate3d(0, ${calcValues(values.text3_translateY_slideOut, currentScrollY)}%, 0)`;
        }
        if (scrollRatio <= 0.82) {
          objs.text4.style.opacity = calcValues(values.text4_opacity_fadeIn, currentScrollY);
          objs.text4.style.transform = `translate3d(0, ${calcValues(values.text4_translateY_slideIn, currentScrollY)}%, 0)`;
        } else {
          objs.text4.style.opacity = calcValues(values.text4_opacity_fadeOut, currentScrollY);
          objs.text4.style.transform = `translate3d(0, ${calcValues(values.text4_translateY_slideOut, currentScrollY)}%, 0)`;
        }
        break;
      
      case 2:
        let sequence2 = Math.round(calcValues(values.imageSquence, currentScrollY));
        objs.context.drawImage(objs.videoImages[sequence2], 0, 0);

        if (scrollRatio <= 0.5) {
          objs.canvas.style.opacity = calcValues(values.canvas_opacity_fadeIn, currentScrollY);
        } else {
          objs.canvas.style.opacity = calcValues(values.canvas_opacity_fadeOut, currentScrollY);
        }

        if (scrollRatio <= 0.25) {
          objs.text1.style.opacity = calcValues(values.text1_opacity_fadeIn, currentScrollY);
          objs.text1.style.transform = `translate3d(0, ${calcValues(values.text1_translateY_slideIn, currentScrollY)}%, 0)`;
        } else {
          objs.text1.style.opacity = calcValues(values.text1_opacity_fadeOut, currentScrollY);
          objs.text1.style.transform = `translate3d(0, ${calcValues(values.text1_translateY_slideOut, currentScrollY)}%, 0)`;
        }
        if (scrollRatio <= 0.57) {
          objs.text2.style.transform = `translate3d(0, ${calcValues(values.text2_translateY_slideIn, currentScrollY)}%, 0)`;
          objs.text2.style.opacity = calcValues(values.text2_opacity_fadeIn, currentScrollY);
          objs.pin1.style.transform = `scaleY(${calcValues(values.pin1_scaleY, currentScrollY)})`;
        } else {
          objs.text2.style.transform = `translate3d(0, ${calcValues(values.text2_translateY_slideOut, currentScrollY)}%, 0)`;
          objs.text2.style.opacity = calcValues(values.text2_opacity_fadeOut, currentScrollY);
          objs.pin1.style.transform = `scaleY(${calcValues(values.pin1_scaleY, currentScrollY)})`;
        }
        if (scrollRatio <= 0.83) {
          objs.text3.style.transform = `translate3d(0, ${calcValues(values.text3_translateY_slideIn, currentScrollY)}%, 0)`;
          objs.text3.style.opacity = calcValues(values.text3_opacity_fadeIn, currentScrollY);
          objs.pin2.style.transform = `scaleY(${calcValues(values.pin2_scaleY, currentScrollY)})`;
        } else {
          objs.text3.style.transform = `translate3d(0, ${calcValues(values.text3_translateY_slideOut, currentScrollY)}%, 0)`;
          objs.text3.style.opacity = calcValues(values.text3_opacity_fadeOut, currentScrollY);
          objs.pin2.style.transform = `scaleY(${calcValues(values.pin2_scaleY, currentScrollY)})`;
        }
        break;
      
      case 3:
        break;
    }
  }

  function scrollLoop() {
    enterNewScene = false;
    prevScrollHeight = 0;
  
    for (let i = 0; i < currentScene; i++) {
      // prevScrollHeight = prevScrollHeight + sceneInfo[i].scrollHeight;
      prevScrollHeight += sceneInfo[i].scrollHeight;
    }

    if (yScroll > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
      enterNewScene = true;
      currentScene++;
      document.body.setAttribute('id',`show-scene-${currentScene + 1}`)
    }

    if (yScroll < prevScrollHeight) {
      if (currentScene === 0) return; // 브라우저 바운스 효과로 인해 마이너스가 되는 것을 방지(모바일)
      enterNewScene = true;
      currentScene--;
      document.body.setAttribute('id',`show-scene-${currentScene + 1}`)
    }

    if (enterNewScene) return;

    // console.log(currentScene);
    // console.log(prevScrollHeight)

    playAnimation();
  }

  window.addEventListener('scroll', () => { 
    yScroll = window.scrollY; // 현재 스크롤한 위치 정보 (구형 브라우저 대응시 pageYOffset)
    scrollLoop();
  });

  // window.addEventListener('DOMContentLoaded', setLayout);
  window.addEventListener('load', () => {   
    setLayout();
    sceneInfo[0].objs.context.drawImage(sceneInfo[0].objs.videoImages[0], 0, 0);
  });

  window.addEventListener('resize', setLayout);

})();