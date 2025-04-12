import { MEMBER_ROLES_NUMBER } from '../constants/memberRole';

export function isDeveloper(memberRole) {
  return memberRole?.access_level >= MEMBER_ROLES_NUMBER.DEVELOPER;
}

export function isMaintainer(memberRole) {
  return memberRole?.access_level >= MEMBER_ROLES_NUMBER.MAINTAINER;
}

export function hasMaintainerPermission(memberRole, envname) {
  switch (envname) {
    case 'dev':
      return isDeveloper(memberRole);
    case 'test':
      return isDeveloper(memberRole);
    case 'fat':
      return isDeveloper(memberRole);
    case 'prod':
      return isMaintainer(memberRole);
    case 'pre':
      return isMaintainer(memberRole);
    default:
      return false;
  }
}

export function hasDeveloperPermission(memberRole, envname) {
  switch (envname) {
    case 'dev':
      return isDeveloper(memberRole);
    case 'test':
      return isDeveloper(memberRole);
    case 'fat':
      return isDeveloper(memberRole);
    case 'prod':
      return isDeveloper(memberRole);
    case 'pre':
      return isDeveloper(memberRole);
    default:
      return false;
  }
}
