start:
	docker rm nodejs-image-demo
	docker build -t your_dockerhub_username/nodejs-image-demo .
	docker run --name nodejs-image-demo -p 80:8080 -d your_dockerhub_username/nodejs-image-demo

stop:
	docker ps
	@echo '______________________'
	@echo "TO STOP DOCKER TYPE: docker stop 'container ID'"

restart:
	docker restart nodejs-image-demo