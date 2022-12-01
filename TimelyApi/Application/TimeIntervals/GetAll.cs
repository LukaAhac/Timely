using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TimelyApi.Application.Core;
using TimelyApi.Data;
using TimelyApi.Models;

namespace TimelyApi.Application.TimeIntervals
{
    public class GetAll
    {
        public class Query : IRequest<Result<List<TimeInterval>>> {}

        public class Handler : IRequestHandler<Query, Result<List<TimeInterval>>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
            _context = context;
            }

            public async Task<Result<List<TimeInterval>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<TimeInterval>>.Success(await _context.TimeIntervals.ToListAsync());
            }
        }
    }
}