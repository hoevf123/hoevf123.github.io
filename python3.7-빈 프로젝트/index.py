import tkinter
import threading
import cv2
import os
import numpy as np

pallete_types=[
    {"ptype":'디자인 두루마리 큐브', "imgSrc":'default_palletes/디자인 두루마리 큐브.png'},
    {"ptype":'디자인 바 테이블 큐브', "imgSrc":'./default_palletes/디자인 바 테이블 큐브.png'},
    {"ptype":'디자인 사다리꼴 큐브', "imgSrc":'./default_palletes/디자인 사다리꼴 큐브.png'},
    {"ptype":'디자인 액자 큐브', "imgSrc":'./default_palletes/디자인 액자 큐브.png'},
    {"ptype":'디자인 카드 큐브', "imgSrc":'./default_palletes/디자인 카드 큐브.png'},
    {"ptype":'디자인 칸막이 큐브', "imgSrc":'./default_palletes/디자인 칸막이 큐브.png'},
    {"ptype":'디자인 큐브', "imgSrc":'./default_palletes/디자인 큐브.png'}
]


def imreadEX(image_path):
    stream = open(image_path, "rb")
    return cv2.imdecode(np.asarray(bytearray(stream.read())
                                   ,dtype=np.uint8)
                        ,cv2.IMREAD_UNCHANGED)

class MS2DesignPalleteProgram:
    def setWindowSize(width,height):
        if (width != None):
            self.width = width
        if (height != None):
            self.height = height
        self.w.geometry(str(self.width) + 'x' + str(self.height))
        
    def __init__(self, title, width=1200,height=1050):
        self.setWindowSize(width,height)
        pass
    
#그림 도안을 저장하는 클래스 입니다.

#메인 함수
def main():
    w = tkinter.Tk()
    w.title("안녕하세요")
    w.geometry('1200x1050')
    
    
    lbl = tkinter.Label(w,text='안녕하세요')
    lbl.grid(column=1, row=0)
    lbl_introduction = tkinter.Label(w,text="원하시는 도안을 선택해 주세요.")
    lbl_introduction.grid(column=0, row=0)

    listbox = tkinter.Listbox(w)
    listbox.grid(column = 0, row = 1)
    listbox.insert(0,"항목 없음")

    def onselect_loadImage(evt):
        widget = evt.widget
        picked = widget.curselection()[0]
        value = widget.get(picked)
        print(str(evt), "val :", str(value) ,"picked : "+ str(picked))

        load_img_src = pallete_types[picked-1]["imgSrc"]

        if not(load_img_src == None or load_img_src == ""):
            #이미지 파일을 불러오기
            print(load_img_src)
            arr_img = imreadEX(load_img_src)
            print(arr_img)
    
    #팔레트 목록 넣기
    i = 1
    for a in pallete_types:
        listbox.insert(i, str(a["ptype"]))
        listbox.bind('<<ListboxSelect>>', onselect_loadImage)
        i = i + 1
    

    canvas_init_width=768
    canvas_init_height=768
    
    canvas = tkinter.Canvas(w, width=canvas_init_width, height=canvas_init_height)
    canvas.grid(column=1, row = 1)
    back_color=canvas.create_rectangle(0,0, canvas_init_width, canvas_init_height, fill="cyan")
    #canvas.delete(back_color)

    w.mainloop()

t_main = threading.Thread(target=main)
t_main.start()
t_main.join()
