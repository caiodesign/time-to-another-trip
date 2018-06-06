FROM delitescere/jdk

ENV HOME=/usr/local/

COPY . $HOME

WORKDIR $HOME

ONBUILD ADD tech_assignment_mobile_stubs.yml /usr/local/tech_assignment_mobile_stubs.yml

RUN wget http://caiodesign.com/public/stubby4j/stubby4j-6.0.1.jar

CMD java -jar ./stubby4j-6.0.1.jar -d ./tech_assignment_mobile_stubs.yml -l 0.0.0.0 -da -s $STUBBY_PORT
