navigator.mediaDevices.getUserMedia({ audio: true, video: false })
  .then((mediaStream) => {
    const context = new AudioContext();
    const source = context.createMediaStreamSource(mediaStream);

    const analyser = context.createAnalyser();
    source.connect(analyser);
    analyser.connect(context.destination);
  });
