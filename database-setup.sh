#!/bin/bash

set -e

cd "$(dirname "${BASH_SOURCE[0]}")"

echo ""
echo "Database를 선택하세요:"
echo "  1) PostgreSQL (기본)"
echo "  2) MySQL"
echo ""
read -p "선택 [1]: " choice

case "${choice:-1}" in
    1) db="pgsql" ;;
    2) db="mysql" ;;
    *)
        echo "잘못된 선택입니다."
        exit 1
        ;;
esac

# compose.yaml 복사
cp "stubs/docker/compose.${db}.yaml" compose.yaml
echo "compose.yaml -> ${db} 설정 적용"

# .env 파일이 없으면 .env.example에서 복사
if [ ! -f .env ]; then
    cp .env.example .env
    echo ".env 파일 생성"
fi

# DB 설정 치환
if [ "$db" = "mysql" ]; then
    sed -i 's/^DB_CONNECTION=.*/DB_CONNECTION=mysql/' .env .env.example
    sed -i 's/^DB_HOST=.*/DB_HOST=mysql/' .env .env.example
    sed -i 's/^DB_PORT=.*/DB_PORT=3306/' .env .env.example
else
    sed -i 's/^DB_CONNECTION=.*/DB_CONNECTION=pgsql/' .env .env.example
    sed -i 's/^DB_HOST=.*/DB_HOST=pgsql/' .env .env.example
    sed -i 's/^DB_PORT=.*/DB_PORT=5432/' .env .env.example
fi

# 셋업 파일 정리
rm -rf stubs
rm -f database-setup.sh

echo ""
echo "${db} 설정이 완료되었습니다."
