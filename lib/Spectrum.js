const spectrumMaxExponent = 5;
const spectrumMinExponent = 3;

const spectrumHeight = 160;

function exponentialTransform(array) {
  const newArr = [];
  for (let i = 0; i < array.length; i += 1) {
    const exp =
      spectrumMaxExponent +
      (spectrumMinExponent - spectrumMaxExponent) * (i / array.length);
    newArr[i] = Math.max(
      (array[i] / spectrumHeight) ** exp * spectrumHeight,
      1,
    );
  }
  return newArr;
}

function SpectrumEase(v) {
  return v ** 2.55;
}

export default {
  GetVisualBins(dataArray, numElements, SpectrumStart, SpectrumEnd) {
    const SpectrumBarCount = numElements;
    const SamplePoints = [];
    const NewArray = [];
    let LastSpot = 0;
    for (let i = 0; i < SpectrumBarCount; i += 1) {
      let Bin = Math.round(
        SpectrumEase(i / SpectrumBarCount) * (SpectrumEnd - SpectrumStart) +
          SpectrumStart,
      );
      if (Bin <= LastSpot) {
        Bin = LastSpot + 1;
      }
      LastSpot = Bin;
      SamplePoints[i] = Bin;
    }

    const MaxSamplePoints = [];
    for (let i = 0; i < SpectrumBarCount; i += 1) {
      const CurSpot = SamplePoints[i];
      let NextSpot = SamplePoints[i + 1];
      if (NextSpot == null) {
        NextSpot = SpectrumEnd;
      }

      let CurMax = dataArray[CurSpot];
      let MaxSpot = CurSpot;
      const Dif = NextSpot - CurSpot;
      for (let j = 1; j < Dif; j += 1) {
        const NewSpot = CurSpot + j;
        if (dataArray[NewSpot] > CurMax) {
          CurMax = dataArray[NewSpot];
          MaxSpot = NewSpot;
        }
      }
      MaxSamplePoints[i] = MaxSpot;
    }

    for (let i = 0; i < SpectrumBarCount; i += 1) {
      const NextMaxSpot = MaxSamplePoints[i];
      let LastMaxSpot = MaxSamplePoints[i - 1];
      if (LastMaxSpot == null) {
        LastMaxSpot = SpectrumStart;
      }
      const LastMax = dataArray[LastMaxSpot];
      const NextMax = dataArray[NextMaxSpot];

      NewArray[i] = (LastMax + NextMax) / 2;
      if (Number.isNaN(NewArray[i])) {
        NewArray[i] = 0;
      }
    }
    return exponentialTransform(NewArray);
  },
};
