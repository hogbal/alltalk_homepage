FROM node:14

RUN apt-get update -y && \
	apt-get install openssh-server -y

WORKDIR /app

RUN npm install

EXPOSE 22

#ssh config
RUN sed -ri 's/^#?PermitRootLogin\s+.*/PermitRootLogin yes/' /etc/ssh/sshd_config && \
    sed -ri 's/UsePAM yes/#UsePAM yes/g' /etc/ssh/sshd_config

RUN service ssh start
CMD ["/usr/sbin/sshd", "-D"]