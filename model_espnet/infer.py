import soundfile
from espnet2.bin.asr_inference import Speech2Text
import sys
import signal, os
import re

IS_STOP = False

def state_callback(*args):
    pass

speech2text = Speech2Text(
    "model_espnet/exp/asr_train_asr_conformer6_raw_vi_bpe6000_sp/config.yaml",
    "model_espnet/exp/asr_train_asr_conformer6_raw_vi_bpe6000_sp/44epoch.pth",
    beam_size=1,
    ctc_weight=1,
    penalty=0.4,
    nbest=1
    )
chars_to_ignore_regex = '[\,\̀\#\̃\_\̣\=\$\&\̉\?\̀\.\!\́\-\;\:\"\“\%\‘\”\�]'

def remove_special_characters(trans):
    trans = re.sub(chars_to_ignore_regex, '', trans).lower() + ""
    return trans

def start_asr():
    global IS_STOP
    speech, rate = soundfile.read(sys.argv[1])
    nbests = speech2text(speech)
    text, *_ = nbests[0]
    text = remove_special_characters(text)
    return text

def handler(signum, frame):
    global IS_STOP
    IS_STOP = True

if __name__ == "__main__":
    signal.signal(signal.SIGINT, handler)
    text=start_asr()
    print(text)
