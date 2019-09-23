#include<iostream>
#include<windows.h>
/*
	Notice : This Win32 Console Application is Only Support Visual Studio 2015(Not 2013 OR LOWER Version)

	print_page_0.0.3.html 웹 페이지의 파일 입출력 상태를 확인하는 소스입니다.
	(XMLHttpRequest 메소드를 이용하여 파일을 읽는 방법)

	의도 : HTML5에서 파일 읽기만 가능한 점을 응용, 다른 프로그램이 실행 중일 때에도 파일 읽기가 가능한지 확인하는 콘솔 프로그램이다.
*/


FILE *wfp;
void main()
{
	
	for (;;)
	{
		printf("write testing...\n");
		if (fopen_s(&wfp, "myfile.html", "w+"))//if file isn't able to open now...(File Access Denied Exception Code)
		{
			printf("File Read Failed");
		}
		fprintf_s(wfp, "<!DOCTYPE html>\n");
		fprintf_s(wfp, "<html>\n");
		fprintf_s(wfp, "<head></head>");
		fprintf_s(wfp, "<body>\n");
		fprintf_s(wfp, "<p id = \"file_status\">read testing...\n</p>");
		fprintf_s(wfp, "</body>\n");
		fprintf_s(wfp, "</html>\n");
		fclose(wfp);
		printf("write file pointer Closed");
		if (GetAsyncKeyState(0x43) & 0x8000)
		{
			break;
		};
		Sleep(1000);
	}
	return;
}