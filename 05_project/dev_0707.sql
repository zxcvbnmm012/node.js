use dev;

SELECT * FROM t_category;
select * from t_seller;
select * from t_image;
select * from t_product;
select * from t_user;

-- 상품(product), 카테고리(category), 이미지(image)
insert into t_seller(name, email, phone)
values ('sellor01', '01@email.com', '010-0000-0000'); 

insert into t_category( category1, category2, category3)
values ('컴퓨터', '주요부품', '메인보드');

insert into t_category( category1, category2, category3)
values ('컴퓨터', '주변기기', '마우스');

insert into t_category( category1, category2, category3)
values ('컴퓨터', '주변기기', '키보드');

insert into t_product (product_name, product_price, delivery_price, seller_id, category_id)
values ('lg 마우스', 15000, 3000, 1, 2);

insert into t_product (product_name, product_price, delivery_price, seller_id, category_id)
values ('logitech 마우스', 15000, 3000, 1, 2);

insert into t_image(product_id, type, path)
values (2, 1, 'upload/2/thumnail.jpg');

insert into t_image(product_id, type, path)
values (3, 1, 'upload/3/thumnail2.jpg');

select concat(c.category1, '/', c.category2, '/', c.category3)
			as category
            , p.id
            , p.product_name
            , p.delivery_price
            , i.*
		from t_product p
        join t_category c
        on p.category_id = c.id
        join t_image i
        on p.id = i.product_id
        and i.type = 1
        where p.product_name = 'lg 마우스';
        
        
