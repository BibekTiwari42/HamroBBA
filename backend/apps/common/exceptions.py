import logging
import rest_framework.views #type: ignore

logger = logging.getLogger(__name__)


def custom_exception_handler(exc, context):
    response = rest_framework.views.exception_handler(exc, context)

    logger.error(
        f"Exception occurred: {str(exc)}",
        exc_info=True
    )

    if response is not None:
        response.data = {
            "success": False,
            "errors": response.data
        }

    return response