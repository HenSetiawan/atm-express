# ATM Machine Application with Express js and Mysql
Aplikasi ini adalah simulasi proses transaksi sederhana pada mesin ATM

## Entity Relation Diagram
Berikut adalah ERD dari DB yang digunakan. 
- One to One (user to account): satu user memiliki satu account
- One to Many (account to transactions): satu accout dapat memiliki banyak transaksi

## Use Case
 - Auth
    - [ ]  User dapat melakukan register akun
    - [ ]  User dapat login dengan akun yang sudah terdaftar
    - [ ]  Auth menggunakan JWT token
    - [ ]  Auth menggunakan refresh token
    - [ ]  User dapat Logout dan token akan dihapus
- CRUD
    - [ ]  User dapat melakukan transaksi deposito untuk akun miliknya
    - [ ]  User dapat melakukan transaksi tranfer pada akun user lain
    - [ ]  User dapat melihat traksaksi miliknya
    - [ ]  User dapat mengubah data dirinya
    - [ ]  User dapat menghapus akun miliknya
 
## Dokumentasi API
Swagger :