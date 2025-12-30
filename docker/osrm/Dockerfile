FROM osrm/osrm-backend:latest

WORKDIR /data

COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

ENV OSRM_PBF=sul.osm.pbf
ENV OSRM_DATA_BASENAME=sul
ENV OSRM_PROFILE=/opt/car.lua
ENV OSRM_ALGORITHM=mld

EXPOSE 5000

CMD ["/usr/local/bin/entrypoint.sh"]
