#!/usr/local/bin/python
import time
import MySQLdb

from pycont.settings import DATABASES


TIMEOUT_SECONDS = 30

start = time.time()

host = DATABASES['default']['HOST']
user = DATABASES['default']['USER']
password = DATABASES['default']['PASSWORD']
port = int(DATABASES['default']['PORT'])
db = f'test_{DATABASES["default"]["NAME"]}'


while time.time() - start < TIMEOUT_SECONDS:
    try:
        conn = MySQLdb.connect(host=host, user=user, passwd=password, port=port)

        while time.time() - start < TIMEOUT_SECONDS:
            cursor = conn.cursor()
            cursor.execute(f"show databases like '{db}'")
            result = cursor.fetchone()

            if result and len(result) > 0:
                print('GOTCHA !!')
                exit(0)
            else:
                time.sleep(1)

            cursor.close()
        conn.close()
    except Exception:
        print('Could not connect, sleep 1 sec.')
        time.sleep(1)

print('Could not connect, before timeout')
exit(1)
