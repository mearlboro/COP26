import git

def Pull_Assets():
    repo = git.Repo('COP26')
    repo.remote().fetch()
    origin = repo.remote(name='origin')

    repo.git.add('assets/data/livegraph_150.js')
    repo.git.add('assets/data/livegraph_500.js')
    repo.git.add('assets/data/livegraph_1500.js')
    repo.git.add('assets/data/trend_data.csv')
    try:
        repo.git.add('assets/data/trend_data_cf.csv')
    except:
        pass

    repo.git.commit('-m', 'Updated live files')
    origin.pull()
    origin.push()
