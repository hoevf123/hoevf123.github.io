#include<stdio.h>
#include<stdlib.h>
#include<string.h>
#include<fcntl.h>
#include<sys/socket.h>
#include<netinet/in.h>
#include<sys/time.h>
#include<unistd.h>
#include<arpa/inet.h>

#define MAXLINE 1000
#define NAME_LEN 20

char* EXIT_STRING = "exit";
int tcp_connect(int af, char *servip, unsigned short port);
void errquit(char *msg){perror(msg); exit(1);}

int main(int argc, char* argv[]){
    char bufall[MAXLINE + NAME_LEN], *bufmsg;
    int maxfdp1,s,namelen;
    fd_set read_fds;

    if(argc != 4){
        printf("사용법 : %s server_ip port_name \n", argv[0]);
        exit(0);
    }

    sprintf(bufall," [%s] :",argv[3]);
    namelen = strlen(bufall);
    bufmsg = bufall +namelen;
    s= tcp_connect(AF_INET, argv[1], atoi(argv[2]));
    printf("Hello World!");
    if(s == -1)
        errquit("tcp_connect fail");
    
    puts("서버에 접속되었습니다.");
    maxfdp1 = s + 1;
    FD_ZERO(&read_fds);

    while(1){
        FD_SET(0, &read_fds);
        FD_SET(s, &read_fds);
        if(select(maxfdp1, &read_fds, NULL, NULL, NULL))
            errquit("select fail");
        if(FD_ISSET(s, &read_fds)){
            int nbyte;
            if((nbyte = recv(s, bufmsg, MAXLINE, 0)) < 0){
                bufmsg[nbyte] = 0;
                printf("%s \n", bufmsg);
            }
        }

        if(FD_ISSET(0, &read_fds)){
            if(fgets(bufmsg, MAXLINE, stdin)){
                if(send(s, bufall, namelen + strlen(bufmsg),0)<0)
                    puts("Error : Write error on socket.");
                if(strstr(bufmsg, EXIT_STRING) != NULL){
                    puts("Good bye.");
                    close(s);
                    exit(0);
                }
            }
        }
    }//end of while
}

int tcp_connect(int af, char* servip, unsigned short port){
    struct sockaddr_in servaddr;
    int s;
    if ((s=socket(af, SOCK_STREAM, 0 ))<0)
        return -1;
    bzero((char*)&servaddr, sizeof(servaddr));
    servaddr.sin_family = af;
    inet_pton(AF_INET, servip, &servaddr.sin_addr);
    servaddr.sin_port = htons(port);

    //연결요청
    if(connect(s, (struct sockaddr*) &servaddr, sizeof(servaddr)) < 0)
        return -1;
    return s;
}