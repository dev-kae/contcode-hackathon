from loguru import logger

logger.add("../log/microservico.log", rotation="500 MB", level="DEBUG")

