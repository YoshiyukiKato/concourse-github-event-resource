# concourse-github-event-resource

A concourse resource to handle github events with webhook.

```yaml
resource_types:
  - name: github-event
    type: docker-image
    source:
      repository: yoshiyuki/concourse-github-event-resource
      tag: 1.0.3

resource:
  - name: github-branch-delete
    type: github-event
    source:
      api_base_url: https://api.github.com
      access_token: your_access_token
      repository:
        owner: repo_owner
        name: repo_name
      event:
        type: DeleteEvent
        ref_type: branch
        ref: "*"
```

## `in`
