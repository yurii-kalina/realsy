create table if not exists roles
(
    id               bigint auto_increment
        primary key,
    created_at       datetime(6)  null,
    last_modified_at datetime(6)  null,
    version  users        bigint       null,
    name             varchar(255) null
);

create table if not exists users
(
    id               bigint auto_increment
        primary key,
    created_at       datetime(6)         null,
    last_modified_at datetime(6)         null,
    version          bigint              null,
    avatar           varchar(255)        null,
    full_name        varchar(255)        null,
    occupation       varchar(255)        null,
    password         varchar(255)        null,
    phone            varchar(255) unique null,
    response_rate    varchar(255)        null,
    is_smoker        boolean             null default false,
    is_working       boolean             null default false,
    is_phone_visible boolean                  default true,
    fk_role_id       bigint              null,
    foreign key (fk_role_id) references roles (id)
);

create table if not exists property_types
(
    id               bigint auto_increment
        primary key,
    created_at       datetime(6)  null,
    last_modified_at datetime(6)  null,
    version          bigint       null,
    name             varchar(255) null,
    priority         bigint       null
);

create table if not exists property_categories
(
    id               bigint auto_increment
        primary key,
    created_at       datetime(6)  null,
    last_modified_at datetime(6)  null,
    version          bigint       null,
    icon             varchar(255) null,
    name             varchar(255) null,
    priority         bigint       null,
    fk_type_id       bigint       null,
    foreign key (fk_type_id) references property_types (id)
);

create table if not exists configuration_categories
(
    id               bigint auto_increment
        primary key,
    created_at       datetime(6)  null,
    last_modified_at datetime(6)  null,
    version          bigint       null,
    icon             varchar(255) null,
    name             varchar(255) null,
    priority         bigint       not null,
    is_detailed      boolean default false,
    is_only_for_rent boolean default false
);

create table if not exists configuration_types
(
    id               bigint auto_increment
        primary key,
    created_at       datetime(6)  null,
    last_modified_at datetime(6)  null,
    version          bigint       null,
    name             varchar(255) null
);

create table if not exists configurations
(
    id               bigint auto_increment
        primary key,
    created_at       datetime(6)  null,
    last_modified_at datetime(6)  null,
    version          bigint       null,
    icon             varchar(255) null,
    is_icon_large    boolean      null default 0,
    is_special       boolean      null default false,
    is_header        boolean      null default false,
    name             varchar(255) null,
    priority         bigint       not null,
    unit             varchar(255),
    fk_category_id   bigint       null,
    fk_type_id       bigint       null,
    weight           double       null default 1,
    foreign key (fk_type_id) references configuration_types (id),
    foreign key (fk_category_id) references configuration_categories (id)
);


create table if not exists configuration_values
(
    id                  bigint auto_increment
        primary key,
    created_at          datetime(6)  null,
    last_modified_at    datetime(6)  null,
    version             bigint       null,
    icon                varchar(255) null,
    is_icon_large       boolean           default true,
    value_text          varchar(255),
    value_number        double,
    fk_configuration_id bigint       null,
    is_optional         boolean           default false,
    icon_width          double       null default 0,
    foreign key (fk_configuration_id) references configurations (id)

);

create table if not exists metros
(
    id               bigint auto_increment
        primary key,
    created_at       datetime(6)  null,
    last_modified_at datetime(6)  null,
    version          bigint       null,
    name             varchar(255) null
);

create table if not exists locations
(
    id                  bigint auto_increment
        primary key,
    created_at          datetime(6)  null,
    last_modified_at    datetime(6)  null,
    version             bigint       null,
    building_number     varchar(255) null,
    geo_location        varchar(255) null,
    street              varchar(255) null,
    distance_from_metro double,
    city_id             bigint       null,
    foreign key (city_id) references cities (id)
);

create table if not exists properties
(
    id                                 bigint auto_increment
        primary key,
    name                               varchar(255) null,
    created_at                         datetime(6)  null,
    last_modified_at                   datetime(6)  null,
    version                            bigint       null,
    date_of_arrival                    datetime(6)  null,
    price                              double       null,
    is_available_for_immediate_arrival boolean      null default false,
    is_available_for_rent              boolean      null default false,
    is_available_for_sale              boolean      null default false,
    is_active                          boolean      null default false,
    locations_id                       bigint       null,
    property_type_id                   bigint       null,
    property_category_id               bigint       null,
    user_id                            bigint       null,
    foreign key (property_type_id) references property_types (id),
    foreign key (property_category_id) references property_categories (id),
    foreign key (user_id) references users (id),
    foreign key (locations_id) references locations (id)
);

create table if not exists propositions
(
    id               bigint auto_increment
        primary key,
    created_at       datetime(6)                                             null,
    last_modified_at datetime(6)                                             null,
    version          bigint                                                  null,
    user_id          bigint                                                  null,
    is_active        boolean                                                 null     default true,
    property_id      bigint                                                  null,
    status           enum ('NEW', 'PENDING', 'REJECTED', 'ACCEPTED', 'SEEN') not null default 'NEW',
    owner_price      double                                                  null,
    client_price     double                                                  null,
    foreign key (user_id) references users (id),
    foreign key (property_id) references properties (id)
);

create table if not exists submitted_values
(
    id                     bigint auto_increment
        primary key,
    created_at             datetime(6) null,
    last_modified_at       datetime(6) null,
    version                bigint      null,
    value_number           double,
    number_from            double,
    number_to              double,
    date_from              datetime(6) null,
    date_to                datetime(6) null,
    distance_in_meters     double,
    value_text             varchar(255),
    value_boolean          boolean default false,
    is_optional            boolean default false,
    icon                   varchar(255),
    configuration_id       bigint      null,
    configuration_value_id bigint      null,
    ad_id                  bigint      null,
    property_id            bigint      null,
    foreign key (configuration_id) references configurations (id),
    foreign key (configuration_value_id) references configuration_values (id),
    foreign key (ad_id) references configurations (id),
    foreign key (property_id) references properties (id)
);

create table if not exists ad
(
    id                   bigint auto_increment
        primary key,
    created_at           datetime(6)          null,
    last_modified_at     datetime(6)          null,
    version              bigint               null,
    active               bit                  not null,
    description          text        null,
    number               varchar(255)         null,
    price                double               not null,
    replies              int                  not null default 0,
    views                int                  not null default 0,
    saved                int                  not null default 0,
    type                 enum ('RENT', 'BUY') not null,
    fk_user_id           bigint               null,
    property_category_id bigint               null,
    location_id          bigint               null,
    foreign key (fk_user_id) references users (id),
    foreign key (location_id) references locations (id),
    foreign key (property_category_id) references property_categories (id)
);

create table if not exists metros
(
    id               bigint auto_increment
        primary key,
    created_at       datetime(6)  null,
    last_modified_at datetime(6)  null,
    version          bigint       null,
    name             varchar(255) null,
    metro_line       varchar(255) null,
    city_id          bigint       null,
    foreign key (city_id) references cities (id)

);


create table if not exists properties
(
    id                                 bigint auto_increment
        primary key,
    created_at                         datetime(6) null,
    last_modified_at                   datetime(6) null,
    version                            bigint      null,
    locations_id                       bigint      null,
    description                        text        null,
    price                              double      null default 0,
    is_available_for_immediate_arrival boolean     null default false,
    is_available_for_rent              boolean     null default false,
    is_available_for_sale              boolean     null default false,
    is_active                          boolean     null default true,
    property_category_id               bigint      null,
    foreign key (locations_id) references locations (id),
    foreign key (property_category_id) references property_categories (id)
);



create table if not exists property_category_configuration
(
    fk_category_id      bigint not null,
    fk_configuration_id bigint not null,
    foreign key (fk_category_id) references property_categories (id),
    foreign key (fk_configuration_id) references configurations (id)
);

create table if not exists messages
(
    id               bigint auto_increment
        primary key,
    created_at       datetime(6)  null,
    last_modified_at datetime(6)  null,
    version          bigint       null,
    text_message     varchar(255) null,
    message_from     double,
    message_to       double,
    fk_receiver_id   bigint,
    fk_sender_id     bigint,
    foreign key (fk_receiver_id) references users (id),
    foreign key (fk_sender_id) references users (id)
);


create table if not exists districts
(
    id               bigint auto_increment
        primary key,
    created_at       datetime(6)  null,
    last_modified_at datetime(6)  null,
    version          bigint       null,
    name             varchar(255) null,
    city_id          bigint       null,
    foreign key (city_id) references cities (id)

);
create table if not exists districts_location
(
    fk_location_id bigint null,
    fk_district_id bigint null,
    foreign key (fk_location_id) references locations (id),
    foreign key (fk_district_id) references districts (id)
);
create table if not exists metros_location
(
    fk_location_id bigint null,
    fk_metro_id    bigint null,
    foreign key (fk_location_id) references locations (id),
    foreign key (fk_metro_id) references metros (id)
);


create table if not exists notifications
(
    id               bigint auto_increment
        primary key,
    created_at       datetime(6)           null,
    last_modified_at datetime(6)           null,
    version          bigint                null,
    title            varchar(255)          null,
    type             varchar(255)          null,
    url              varchar(255)          null,
    status           enum ('SENT', 'READ') not null default 'SENT',
    user_id          bigint                null,
    foreign key (user_id) references users (id)
);

create table if not exists searchs
(
    id               bigint auto_increment
        primary key,
    created_at       datetime(6)  null,
    last_modified_at datetime(6)  null,
    version          bigint       null,
    active           bit          not null,
    description      varchar(255) null,
    name             varchar(255) null,
    price            double       not null,
    fk_user_id       bigint       null,
    foreign key (fk_user_id) references users (id)
);

create table if not exists search_configurations
(
    id                        bigint auto_increment
        primary key,
    created_at                datetime(6) null,
    last_modified_at          datetime(6) null,
    version                   bigint      null,
    fk_configurations_id      bigint      null,
    fk_configuration_value_id bigint      null,
    fk_search_id              bigint      null,
    foreign key (fk_configurations_id) references configurations (id),
    foreign key (fk_search_id) references searchs (id),
    foreign key (fk_configuration_value_id) references configuration_values (id)
);

create table if not exists search_location
(
    fk_search_id   bigint not null,
    fk_location_id bigint not null,
    foreign key (fk_search_id) references searchs (id),
    foreign key (fk_location_id) references locations (id)
);

create table if not exists user_property
(
    id               bigint auto_increment
        primary key,
    created_at       datetime(6) null,
    last_modified_at datetime(6) null,
    version          bigint      null,
    fk_property_id   bigint      null,
    fk_user_id       bigint      null,
    foreign key (fk_user_id) references users (id),
    foreign key (fk_property_id) references properties (id)
);

create table if not exists chat_rooms
(
    id               bigint auto_increment
        primary key,
    created_at       datetime(6) null,
    last_modified_at datetime(6) null,
    version          bigint      null,
    recipient        bigint      null,
    sender           bigint      null,
    foreign key (sender) references users (id),
    foreign key (recipient) references users (id)
);


create table if not exists chat_messages
(
    id               bigint auto_increment
        primary key,
    created_at       datetime(6)           null,
    last_modified_at datetime(6)           null,
    version          bigint                null,
    sender_id        bigint                null,
    recipient_id     bigint                null,
    content          varchar(255)          null,
    timestamp        date                  null,
    status           enum ('SENT', 'READ') not null default 'SENT',
    chat_room_id     bigint                null,
    foreign key (sender_id) references users (id),
    foreign key (recipient_id) references users (id),
    foreign key (chat_room_id) references chat_rooms (id)
);


create table if not exists chat_notifications
(
    id               bigint auto_increment
        primary key,
    created_at       datetime(6)  null,
    last_modified_at datetime(6)  null,
    version          bigint       null,
    sender_id        varchar(255) null,
    sender_name      varchar(255) null
);

create table if not exists property_images
(
    id               bigint auto_increment
        primary key,
    created_at       datetime(6)  null,
    last_modified_at datetime(6)  null,
    version          bigint       null,
    property_id      bigint       not null,
    url              varchar(255) not null,
    foreign key (property_id) references properties (id)
);

create table if not exists favorites
(
    id               bigint auto_increment
        primary key,
    created_at       datetime(6) null,
    last_modified_at datetime(6) null,
    version          bigint      null,
    user_id          bigint      null,
    property_id      bigint      null,
    ad_id            bigint      null,
    foreign key (user_id) references users (id),
    foreign key (property_id) references properties (id),
    foreign key (ad_id) references ad (id)
);

create table if not exists user_ads_favorites
(
    fk_ad_id   bigint not null,
    fk_user_id bigint not null,
    foreign key (fk_ad_id) references ad (id),
    foreign key (fk_user_id) references users (id)
);