# API-solo-project

TODO リストを構築するための API 群になります（作成中）

# REST API

## TODO タスク取得

### Request

`GET /api/task`

### Response

    {
        tasks: [
            {
                id: 1,
                people_id: 1,
                title: "名前",
                description: "内容",
                end_date: "2023-04-01 10:00:00+09",
                notify_date: "2023-03-27 15:00:00+09"
            }
        ]
    }

## TODO タスク追加

### Request

`POST /api/task`

    {
        id: 1,
        people_id: 1,
        title: "名前",
        description: "内容",
        end_date: "2023-04-01 10:00:00+09",
        notify_date: "2023-03-27 15:00:00+09"
    }

### Response

    {
        id: 1
    }

## TODO タスク更新

### Request

`PATCH /api/task/:id`

    {
        id: 1,
        people_id: 1,
        title: "名前",
        description: "内容",
        end_date: "2023-04-01 10:00:00+09",
        notify_date: "2023-03-27 15:00:00+09"
    }

### Response

    {
        id: 1
    }

## TODO タスク削除

### Request

`DELETE /api/task/:id`

### Response

    {
        id: 1
    }
