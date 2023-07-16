import { prisma } from '../index';
import { hashToken } from '../utils';

export function addRefreshTokenToWhitelist({
  jti,
  refreshToken,
  userId,
}: {
  jti: string;
  refreshToken: string;
  userId: string;
}) {
  return prisma.refreshToken.create({
    data: {
      jtiId: jti,
      hashedToken: hashToken(refreshToken),
      userId,
    },
  });
}

// used to check if the token sent by the client is in the database.
export function findRefreshTokenById(jti: string) {
  return prisma.refreshToken.findUnique({
    where: {
      jtiId: jti,
    },
  });
}

// soft delete tokens after usage.
export function deleteRefreshToken(jti: string) {
  return prisma.refreshToken.update({
    where: {
      jtiId: jti,
    },
    data: {
      revoked: true,
    },
  });
}

export function revokeTokens(userId: string) {
  return prisma.refreshToken.updateMany({
    where: {
      userId,
    },
    data: {
      revoked: true,
    },
  });
}
