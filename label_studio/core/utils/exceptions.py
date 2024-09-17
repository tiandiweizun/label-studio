"""This file and its contents are licensed under the Apache License 2.0. Please see the included NOTICE for copyright information and LICENSE for a copy of the license.
"""
from rest_framework import status
from rest_framework.exceptions import APIException, ValidationError


class LabelStudioError(Exception):
    pass


class LabelStudioAPIException(APIException):
    status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
    default_detail = '未知错误'


class LabelStudioDatabaseException(LabelStudioAPIException):
    default_detail = '查询数据库出错'


class LabelStudioDatabaseLockedException(LabelStudioAPIException):
    default_detail = "数据库运行失败"


class ProjectExistException(LabelStudioAPIException):
    status_code = status.HTTP_422_UNPROCESSABLE_ENTITY
    default_detail = '同名项目已经存在'


class LabelStudioErrorSentryIgnored(Exception):
    pass


class LabelStudioAPIExceptionSentryIgnored(LabelStudioAPIException):
    pass


class LabelStudioValidationErrorSentryIgnored(ValidationError):
    pass


class LabelStudioXMLSyntaxErrorSentryIgnored(Exception):
    pass


class InvalidUploadUrlError(LabelStudioAPIException):
    default_detail = (
        '提供的链接非法。链接必须以http://或者https://开头, 也不能是本地的ip地址'
    )
    status_code = status.HTTP_403_FORBIDDEN
