#include<iostream>
#include<windows.h>
/*
	Notice : This Win32 Console Application is Only Support Visual Studio 2015(Not 2013 OR LOWER Version)

	print_page_0.0.3.html �� �������� ���� ����� ���¸� Ȯ���ϴ� �ҽ��Դϴ�.
	(XMLHttpRequest �޼ҵ带 �̿��Ͽ� ������ �д� ���)

	�ǵ� : HTML5���� ���� �б⸸ ������ ���� ����, �ٸ� ���α׷��� ���� ���� ������ ���� �бⰡ �������� Ȯ���ϴ� �ܼ� ���α׷��̴�.
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